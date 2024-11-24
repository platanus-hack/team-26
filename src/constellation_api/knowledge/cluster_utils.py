import numpy as np
from sklearn.cluster import DBSCAN
import umap
from .pinecone import PineConeIndexer  # Import your PineConeIndexer class


class ExperimentClustering:
    """
    Handles reclustering of the top-ranked experiments and generates cosmograph and metadata.
    """

    def __init__(self):
        self.indexer = PineConeIndexer()  # Use PineConeIndexer for ranking

    def recluster(self, query, top_k=100):
        """
        Ranks the top experiments using Pinecone, then reclusters them using UMAP and DBSCAN.

        Parameters
        ----------
        query : str
            The search query for ranking experiments.
        top_k : int
            Number of top experiments to retrieve from Pinecone.

        Returns
        -------
        tuple
            A tuple containing:
            - cosmograph_data: List of edges for the cosmograph.
            - metadata: List of metadata dictionaries for each experiment.
        """
        # Rank experiments using Pinecone
        ranked_results = self.indexer.query_experiments(query=query, top_k=top_k)

        # Check if any valid results are returned
        if not ranked_results:
            raise ValueError("No valid experiments found with embeddings.")

        # Build embeddings and metadata directly from ranked_results
        embeddings = []
        ids = []
        titles = []
        descriptions = []
        results_list = []
        categories = []

        for result in ranked_results:
            ids.append(result["id"])
            titles.append(result["title"])
            descriptions.append(result["description"])
            results_list.append(result["results"])
            categories.append(result["category"])
            embeddings.append(np.array(result["embedding"]))  # Append embedding directly

        embeddings = np.array(embeddings)

        # Check if embeddings array is still empty
        if embeddings.size == 0:
            raise ValueError("Embeddings array is empty. Cannot proceed with clustering.")

        # Debugging: Check shape of embeddings
        print(f"Embeddings shape: {embeddings.shape}")
        print(f"Number of experiments: {len(ids)}")

        # Perform UMAP dimensionality reduction
        umap_reducer = umap.UMAP(n_components=2, random_state=5)
        embeddings_2d = umap_reducer.fit_transform(embeddings)

        # Debugging: Check shape after UMAP
        print(f"UMAP reduced embeddings shape: {embeddings_2d.shape}")

        # Apply DBSCAN clustering
        dbscan = DBSCAN(eps=0.5, min_samples=5)
        clusters = dbscan.fit_predict(embeddings_2d)

        # Build cosmograph data
        edges = []
        cluster_to_experiments = {}
        for cluster_label in np.unique(clusters):
            if cluster_label == -1:  # Skip noise points
                continue

            experiment_indices = np.where(clusters == cluster_label)[0]
            experiment_ids_in_cluster = [ids[i] for i in experiment_indices]
            cluster_to_experiments[cluster_label] = experiment_ids_in_cluster

            # Link all IDs within the same cluster
            for i in range(len(experiment_ids_in_cluster)):
                for j in range(i + 1, len(experiment_ids_in_cluster)):
                    edge = {"source": experiment_ids_in_cluster[i], "target": experiment_ids_in_cluster[j]}
                    edges.append(edge)

        # Find the representative (closest point to centroid) for each cluster
        cluster_representatives = {}
        for cluster_label, experiment_ids_in_cluster in cluster_to_experiments.items():
            indices = [ids.index(eid) for eid in experiment_ids_in_cluster]
            cluster_embeddings = embeddings[indices]
            centroid_embedding = np.mean(cluster_embeddings, axis=0)
            distances = np.linalg.norm(cluster_embeddings - centroid_embedding, axis=1)
            representative_idx = indices[np.argmin(distances)]
            cluster_representatives[cluster_label] = ids[representative_idx]

        # Metadata preparation
        metadata = []
        for idx, experiment_id in enumerate(ids):
            is_representative = experiment_id in cluster_representatives.values()
            metadata_entry = {
                "id": experiment_id,
                "title": titles[idx],
                "description": descriptions[idx],
                "results": results_list[idx],
                "cluster": int(clusters[idx]),
                "is_representative": is_representative,
                "category": categories[idx],
            }
            if is_representative:
                metadata_entry["centroid_embedding"] = embeddings[idx].tolist()
            metadata.append(metadata_entry)

        # Remove experiments from ranked_results before sending
        for result in ranked_results:
            del result["embedding"]

        # Remove centroid embedding from metadata
        for entry in metadata:
            if "centroid_embedding" in entry:
                del entry["centroid_embedding"]

        return edges, metadata, ranked_results