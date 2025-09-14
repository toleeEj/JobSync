# accounts/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from .permissions import IsAdmin, IsAdminOrEmployer
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': {
                'email': user.email,
                'role': user.role,
            },
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    serializer = UserLoginSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': {
                'email': user.email,
                'role': user.role,
            },
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_dashboard(request):
    # This view is only accessible to admins
    users_count = User.objects.count()
    return Response({
        'message': 'Welcome to Admin Dashboard',
        'users_count': users_count
    })

@api_view(['GET'])
@permission_classes([IsAdminOrEmployer])
def employer_dashboard(request):
    # This view is accessible to both admins and employers
    return Response({
        'message': f'Welcome to Employer Dashboard, {request.user.email}',
        'role': request.user.role
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def job_seeker_dashboard(request):
    # This view is accessible to job seekers and admins
    if request.user.role not in [User.Role.JOB_SEEKER, User.Role.ADMIN]:
        return Response(
            {'error': 'You do not have permission to access this resource.'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # You can add more job seeker-specific data here later
    return Response({
        'message': f'Welcome to Job Seeker Dashboard, {request.user.email}',
        'role': request.user.role,
        'dashboard_data': {
            'profile_completion': 65,  # Example data
            'applications_submitted': 12,
            'interviews_scheduled': 3,
            'jobs_recommended': 8
        }
    })
