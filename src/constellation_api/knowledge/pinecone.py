import numpy as np
from constellation_api.utils import get_secret
from openai import OpenAI
from pinecone import Pinecone

from knowledge.models import Experiment

from asgiref.sync import sync_to_async



# secrets
secrets = get_secret("constellarion/api-secrets", MODE="DEVELOPMENT")

open_ai_api_key = secrets["OPEN_AI_API_KEY"]
pinecone_api_key = secrets["PINECONE_API_KEY"]
pinecone_environment = secrets["PINECONE_ENVIRONMENT"]
pinecone_index = "constellation"



class PineConeIndexer:
    """
    To manipulate the pinecone indexes.
    """

    def __init__(self):
        # Retrieve API keys and Pinecone environment variables
        self.openai_api_key = open_ai_api_key
        self.pinecone_api_key = pinecone_api_key
        self.pinecone_environment = pinecone_environment

        self.pinecone = Pinecone(api_key=self.pinecone_api_key)
        self.model = "text-embedding-3-small"
        self.index = pinecone_index
        self.index = self.pinecone.Index(self.index)

    def get_embedding(self, texts):
        """
        Generates an embedding for a given list of texts using the OpenAI API.

        Parameters
        ----------
        texts : list of str
            The texts to generate an embedding for.

        Returns
        -------
        list of numpy.ndarray
            The embedding vectors for the texts.
        """
        client = OpenAI(api_key=self.openai_api_key)

        embeddings = []
        for text in texts:
            text = text.replace("\n", " ")
            embedding = client.embeddings.create(input=[text], model=self.model)
            embedding_vector = embedding.data[0].embedding
            embeddings.append(embedding_vector)

        return embeddings

    def index_experiment(self, experiment):
        """
        Indexes an experiment by embedding and upserting its title, description, and results.

        Parameters
        ----------
        experiment : Experiment instance
            The Experiment object to index.
        """
        texts = [experiment.title, experiment.description, experiment.results]
        embeddings = self.get_embedding(texts)

        # Update the experiment instance with embeddings
        experiment.title_embedding = embeddings[0]
        experiment.description_embedding = embeddings[1]
        experiment.results_embedding = embeddings[2]
        experiment.embedding = np.concatenate(embeddings).tolist()
        experiment.save()

        # Prepare metadata, excluding 'category' if it's None
        def prepare_metadata(field_name):
            metadata = {
                "field": field_name,
                "experiment_id": experiment.id,
            }
            if experiment.category is not None:
                metadata["category"] = experiment.category
            return metadata

        # Upsert embeddings to Pinecone
        vectors = [
            {
                "id": f"title_{experiment.id}",
                "values": embeddings[0],
                "metadata": prepare_metadata("title"),
            },
            {
                "id": f"description_{experiment.id}",
                "values": embeddings[1],
                "metadata": prepare_metadata("description"),
            },
            {
                "id": f"results_{experiment.id}",
                "values": embeddings[2],
                "metadata": prepare_metadata("results"),
            },
        ]
        self.index.upsert(vectors)

    async def index_all_experiments(self):
        """
        Indexes all experiments in the database into Pinecone (async-safe).
        """
        experiments = await sync_to_async(list)(Experiment.objects.all())
        for experiment in experiments:
            await sync_to_async(self.index_experiment)(experiment)

    def query_experiments(self, query, top_k=100):
        """
        Queries experiments by embedding the query and retrieving matches from Pinecone.

        Parameters
        ----------
        query : str
            The search query.
        top_k : int
            The number of top results to retrieve.

        Returns
        -------
        list
            A ranked list of experiments with concatenated embeddings from Pinecone.
        """
        query_embedding = self.get_embedding([query])[0]

        # Query Pinecone
        search_response = self.index.query(
            vector=query_embedding,
            top_k=top_k * 3,  # Account for multiple fields per experiment
            include_values=False,  # We don't need embeddings from Pinecone
            include_metadata=True,
        )

        # Collect matches by experiment ID
        experiment_scores = {}
        for match in search_response["matches"]:
            metadata = match["metadata"]
            score = match["score"]
            experiment_id = metadata.get("experiment_id")
            field = metadata.get("field")
            category = metadata.get("category", "Uncategorized")  # Default if category is missing

            if not experiment_id or not field:
                continue

            if experiment_id not in experiment_scores:
                experiment_scores[experiment_id] = {
                    "score": 0,
                    "fields": set(),
                    "category": category,
                }

            experiment_scores[experiment_id]["score"] += score
            experiment_scores[experiment_id]["fields"].add(field)

        # Filter out experiments missing any required embeddings
        complete_experiment_ids = [
            eid
            for eid, data in experiment_scores.items()
            if len(data["fields"]) == 3  # Ensure all fields (title, description, results) are present
        ]

        # Get the top experiments based on score
        ranked_experiments = sorted(
            [
                (eid, data)
                for eid, data in experiment_scores.items()
                if eid in complete_experiment_ids
            ],
            key=lambda x: x[1]["score"],
            reverse=True,
        )[:top_k]

        # Retrieve Experiment instances
        experiment_ids = [eid for eid, data in ranked_experiments]
        experiments = Experiment.objects.filter(id__in=experiment_ids)

        # Build a mapping from id to Experiment
        experiment_map = {experiment.id: experiment for experiment in experiments}

        # Prepare final ranked experiments
        final_ranked_experiments = []
        for experiment_id, data in ranked_experiments:
            experiment = experiment_map.get(experiment_id)
            if not experiment:
                continue

            # Get embeddings from the model
            title_embedding = np.array(experiment.title_embedding)
            description_embedding = np.array(experiment.description_embedding)
            results_embedding = np.array(experiment.results_embedding)

            # Concatenate embeddings
            concatenated_embedding = np.concatenate(
                [title_embedding, description_embedding, results_embedding]
            )

            final_ranked_experiments.append(
                {
                    "id": experiment_id,
                    "title": experiment.title,
                    "description": experiment.description,
                    "results": experiment.results,
                    "category": data["category"],
                    "embedding": concatenated_embedding.tolist(),  # Convert to list if necessary
                    "score": data["score"],
                }
            )

        return final_ranked_experiments
