from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
import json
from .models import *

# Create your views here.
def test(request):
    return HttpResponse("chat setup ok")

@api_view(["POST"])
@login_required
def create_room(request):
    room_name = request.data.get("roomName")
    is_public = request.data.get("isPublic")
    try:
        room = ChatRoom.objects.create(name=room_name, is_public=is_public)
        ChatRoomMember.objects.create(room=room, user=request.user)
    except:
        return HttpResponse('fail create room', status = 400)
    return HttpResponse()