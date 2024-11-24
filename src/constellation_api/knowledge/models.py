from django.db import models
import jsonfield

class Experiment(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    results = models.TextField()
    cluster = models.IntegerField()
    embedding = jsonfield.JSONField()  # Stores the embedding as a JSON array
    is_representative = models.BooleanField(default=False)
    centroid_embedding = jsonfield.JSONField(null=True, blank=True)  # Optional centroid embedding for representatives
    category = models.CharField(max_length=50, null=True, blank=True)  # For labels like 'proteins', 'education', etc.
    title_embedding = jsonfield.JSONField(null=True, blank=True)  # Separate embeddings for title, description, and results
    description_embedding = jsonfield.JSONField(null=True, blank=True)
    results_embedding = jsonfield.JSONField(null=True, blank=True)

    def __str__(self):
        return self.title

class KnowledgeGraphEdge(models.Model):
    source = models.ForeignKey(Experiment, on_delete=models.CASCADE, related_name='outgoing_edges')
    target = models.ForeignKey(Experiment, on_delete=models.CASCADE, related_name='incoming_edges')

    class Meta:
        unique_together = ('source', 'target')  # Prevent duplicate edges

    def __str__(self):
        return f"{self.source} -> {self.target}"
