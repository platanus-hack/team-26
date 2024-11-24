from django.urls import path
from knowledge.views import UploadDataAPIView, KnowledgeGraphAPIView, ReclusteringAPIView

urlpatterns = [
    path('upload', UploadDataAPIView.as_view(), name='upload-data'),
    path('knowledge-graph', KnowledgeGraphAPIView.as_view(), name='knowledge-graph'),
    path('search', ReclusteringAPIView.as_view(), name='search-experiments'),
]
