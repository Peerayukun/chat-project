from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
import re
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def login(request):
    usernameOrEmail = request.data.get('usernameOrEmail')
    password = request.data.get('password')

    user = authenticate(request, username=usernameOrEmail, password=password)
    if user is None:
        user = authenticate(request, email=usernameOrEmail, password=password)
    if user is not None:
        django_login(request,user)
        response = HttpResponse('log in success')
        response.set_cookie(key='sessionid', value=request.session.session_key, httponly=True)
        return response
    else:
        return HttpResponse('Invalid credentials', status=401)
    
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    firstname = request.data.get('firstname')
    lastname = request.data.get('lastname')
    password = request.data.get('password')
    alpahnumeric = r'^[a-zA-Z0-9]+$'
    emailPattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    response = {"error":[]}
    if not username or username.isspace() or not re.match(alpahnumeric,username):
        response['error'].append('username')
    if not email or email.isspace() or not re.match(emailPattern,email):
        response['error'].append('email')
    if not password or password.isspace():
        response['error'].append('password')
    
    if len(response['error']) > 0:
        return Response(response, status=400)
    else:
        oldUser = User.objects.filter(username=username).first()
        if oldUser:
            response['error'].append('duplicate username')
            return Response(response, status=400)
        oldUser = User.objects.filter(email=email).first()
        if oldUser:
            response['error'].append('duplicate email')
            return Response(response, status=400)
        User.objects.create(username=username,email=email,first_name=firstname,last_name=lastname,password=make_password(password))
        return HttpResponse()

    
@api_view(['GET'])
def user(request):
    if request.user.is_authenticated:
        return JsonResponse({'isAuthenticated':request.user.is_authenticated, 'user':{'firstname':request.user.first_name, 'lastname':request.user.last_name}})
    else:
        return JsonResponse({'isAuthenticated':False})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def logout(request):
    django_logout(request)
    return HttpResponse()