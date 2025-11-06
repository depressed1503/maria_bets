from .models import CustomUser
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
	"""
	ViewSet:
	- POST /api/users/  → регистрация (доступно всем)
	- GET  /api/users/me/ → получить свои данные (только для залогиненных)
	"""

	def get_permissions(self):
		if self.action == 'create':
			return [permissions.AllowAny()]
		return [permissions.IsAuthenticated()]

	def create(self, request):
		"""Регистрация нового пользователя"""
		serializer = CustomUserSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)

	def list(self, request):
		"""Переопределяем list, чтобы GET возвращал данные текущего пользователя"""
		user = request.user
		serializer = CustomUserSerializer(user)
		return Response(serializer.data)