from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    balance = models.FloatField(default=0.0)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    telegram_id = models.CharField(max_length=50, null=True, blank=True)
