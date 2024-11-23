import os
import pandas as pd
import json
import openai

# Embedding Generator Class
class EmbeddingGenerator:
    """
    A utility class for generating text embeddings using OpenAI API.
    """

    def __init__(self, api_key, model="text-embedding-3-small"):
        self.api_key = api_key
        self.model = model
        openai.api_key = self.api_key

    def get_embeddings(self, texts):
        """
        Generates embeddings for a list of text inputs using OpenAI's API.

        Parameters
        ----------
        texts : list of str
            The list of text strings to generate embeddings for.

        Returns
        -------
        list of numpy.ndarray
            A list of embedding vectors corresponding to the input texts.
        """
        embeddings = []
        for text in texts:
            # Ensure input is cleaned for newline issues
            text = text.replace("\n", " ")
            response = openai.Embedding.create(input=text, model=self.model)
            embedding_vector = response['data'][0]['embedding']
            embeddings.append(embedding_vector)
        return embeddings

# Function to generate summaries and metadata using GPT
def generate_summary_and_metadata(fragment, api_key):
    """
    Generates a summary and metadata for a text fragment using OpenAI GPT.

    Parameters
    ----------
    fragment : str
        The text fragment to summarize and analyze.
    api_key : str
        OpenAI API key.

    Returns
    -------
    tuple
        A tuple containing the summary and metadata dictionary.
    """
    openai.api_key = api_key
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an AI trained to classify and summarize text. Your output must be a JSON structure with 'summary', and 'metadata' fields. The metadata should contain whether the text is a 'method', 'results', or 'other'."},
            {"role": "user", "content": f"Analyze and summarize this fragment: {fragment}"}
        ]
    )
    try:
        output = response['choices'][0]['message']['content']
        result = json.loads(output)  # Ensure GPT output is valid JSON
        summary = result.get("summary", "")
        metadata = result.get("metadata", {})
    except (json.JSONDecodeError, KeyError):
        summary = "Error processing fragment"
        metadata = {"type": "error"}
    return summary, metadata

# Main processing function
def chunk_text(text, chunk_size=1000, overlap=100):
    """
    Splits the text into chunks of a specified size with optional overlap.

    Parameters
    ----------
    text : str
        The text to split into chunks.
    chunk_size : int
        The maximum size of each chunk (default: 1000).
    overlap : int
        The number of overlapping characters between consecutive chunks (default: 100).

    Returns
    -------
    list of str
        A list of text chunks.
    """
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks


def process_local_texts(local_folder, embedding_generator, api_key, chunk_size=1000, overlap=100):
    """
    Processes local text files, generating embeddings, summaries, and metadata for each fragment.

    Parameters
    ----------
    local_folder : str
        Path to the folder containing local text files.
    embedding_generator : EmbeddingGenerator
        Instance of the EmbeddingGenerator class.
    api_key : str
        OpenAI API key.
    chunk_size : int
        Maximum size of each text chunk (default: 1000).
    overlap : int
        Number of overlapping characters between consecutive chunks (default: 100).

    Returns
    -------
    pd.DataFrame
        A DataFrame containing the processed data.
    """
    data = []

    for filename in os.listdir(local_folder):
        file_path = os.path.join(local_folder, filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
            # Split text into chunks
            fragments = chunk_text(text, chunk_size=chunk_size, overlap=overlap)

            for fragment in fragments:
                # Generate fragment embedding
                fragment_embedding = embedding_generator.get_embeddings([fragment])[0]

                # Generate summary and metadata
                summary, metadata = generate_summary_and_metadata(fragment, api_key)

                # Generate embedding for summary if metadata indicates "method" or "results"
                summary_embedding = None
                if metadata.get("type") in ["method", "results"]:
                    summary_embedding = embedding_generator.get_embeddings([summary])[0]

                # Append the processed fragment to the data list
                data.append({
                    "fragment": fragment,
                    "fragment_embedding": json.dumps(fragment_embedding),
                    "summary": summary,
                    "summary_embedding": json.dumps(summary_embedding) if summary_embedding else None,
                    "metadata": json.dumps(metadata)
                })

    return pd.DataFrame(data)

