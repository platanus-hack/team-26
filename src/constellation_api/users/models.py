from django.contrib.auth.models import AbstractUser
from django.db import models


class ConstellationUser(AbstractUser):
    full_name = models.CharField(max_length=255, blank=True)
    alias = models.CharField(max_length=255, blank=True)
    invited = models.BooleanField(default=False)