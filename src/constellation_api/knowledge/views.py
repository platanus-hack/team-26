from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from .models import Experiment, KnowledgeGraphEdge
from .cluster_utils import ExperimentClustering
import csv
import json

class UploadDataAPIView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        cosmograph_file = request.FILES.get('cosmograph_data', None)
        metadata_file = request.FILES.get('metadata', None)

        if not cosmograph_file or not metadata_file:
            return Response({'error': 'Both cosmograph_data.csv and metadata.json files are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            # Process metadata.json
            metadata = json.load(metadata_file)
            for experiment in metadata:
                metadata_values = experiment.get('metadata', {})
                Experiment.objects.update_or_create(
                    id=experiment['id'],
                    defaults={
                        'title': metadata_values.get('title'),
                        'description': metadata_values.get('description'),
                        'results': metadata_values.get('results'),
                        'cluster': metadata_values.get('cluster'),
                        'is_representative': metadata_values.get('is_representative', False),
                        'centroid_embedding': metadata_values.get('centroid_embedding'),
                        'category': metadata_values.get('category')
                    }
                )

            # Process cosmograph_data.csv
            data = csv.DictReader(cosmograph_file.read().decode('utf-8').splitlines())
            edges = []
            for row in data:
                source_id = row['source']
                target_id = row['target']
                edges.append(KnowledgeGraphEdge(
                    source_id=source_id,
                    target_id=target_id
                ))

            # Bulk create edges, avoiding duplicates
            KnowledgeGraphEdge.objects.bulk_create(edges, ignore_conflicts=True)

            return Response({'message': 'Data uploaded successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class KnowledgeGraphAPIView(APIView):
    def get(self, request):
        # Fetch cosmograph data (edges)
        edges = KnowledgeGraphEdge.objects.values('source_id', 'target_id')
        cosmograph_data = [{'source': edge['source_id'], 'target': edge['target_id']} for edge in edges]

        # Fetch all metadata
        experiments = Experiment.objects.values(
            'id', 'title', 'description', 'results', 'cluster', 'is_representative', 'category'
        )

        # Fetch only representatives
        representatives = Experiment.objects.filter(is_representative=True).values(
            'id', 'title', 'description', 'results', 'cluster', 'category'
        )

        print(representatives)

        return Response({
            'cosmograph_data': cosmograph_data,
            'metadata': list(experiments),
            'representatives': list(representatives)  # Add a separate key for representative experiments
        }, status=200)
    

class ReclusteringAPIView(APIView):
    def post(self, request):
        query = request.data.get("query", "")
        if not query:
            return Response({"error": "Query is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize clustering handler
        clustering = ExperimentClustering()

        # Perform ranking and reclustering
        cosmograph_data, metadata, ranked_results = clustering.recluster(query=query, top_k=100)

        # Return the response
        return Response({
            "cosmograph_data": cosmograph_data,
            "metadata": metadata,
            "ranked_results": ranked_results,
        }, status=status.HTTP_200_OK)
