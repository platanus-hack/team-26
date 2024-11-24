from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer, CharField, EmailField

# Get the custom user model
User = get_user_model()

class SignupSerializer(ModelSerializer):
    password = CharField(write_only=True)
    email = EmailField(required=True)  # Ensure email is validated

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'full_name', 'alias', 'invited')  # Include custom fields

    def create(self, validated_data):
        # Create a user instance with the validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            alias=validated_data.get('alias', ''),
            invited=validated_data.get('invited', False)
        )
        return user
# Signup View
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View (uses TokenObtainPairView from simplejwt)
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

# Create your views here.
