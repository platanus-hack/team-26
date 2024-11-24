from django.contrib import admin
from django.urls import path
from django.urls.conf import include

base_url = "constellation/v1"

urlpatterns = [
    path(f'{base_url}/admin/', admin.site.urls),
    path(f'{base_url}/users/', include('users.urls')),
    path(f'{base_url}/knowledge/', include('knowledge.urls')),
]
