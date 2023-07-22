from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
import json
from .models import *
from django_chat.config import DB_NAME

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def create_room(request):
    room_name = request.data.get("roomName")
    try:
        room = ChatRoom.objects.create(name=room_name)
        ChatRoomMember.objects.create(room=room, user=request.user)
    except:
        return HttpResponse('fail create room', status = 400)
    return HttpResponse(room.id)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def delete_room(request):
    room_id = request.data.get("roomId")
    member = ChatRoomMember.objects.filter(room__id=room_id,user=request.user).first()
    if member:
        member.room.delete()
        return HttpResponse()
    else:
        return HttpResponse('no room or you are not a member', status = 400)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def join_room(request):
    room_id = request.data.get("roomId")
    member = ChatRoomMember.objects.filter(room__id=room_id,user=request.user).first()
    if member and member.status == "joined":
        return HttpResponse()
    elif member and member.status == "left":
        member.status = "joined"
        member.save()
        return HttpResponse()
    else:
        room = ChatRoom.objects.filter(id=room_id).first()
        if room:
            ChatRoomMember.objects.create(room=room, user=request.user)
            return HttpResponse()
        else:
            return HttpResponse('no room',status=400)
        
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def leave_room(request):
    room_id = request.data.get("roomId")
    member = ChatRoomMember.objects.filter(room__id=room_id,user=request.user).first()
    if member:
        member.status = "left"
        member.save()
    return HttpResponse()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def rooms(request):
    result = [{"id":i.id,"name": i.name,"type": i.type} for i in ChatRoom.objects.raw("""select id, name, case when room_id is null then 'public' else 'joined' end as type from {0}.chat_chatroom t1 left join 
                                                                (select distinct(room_id) from {1}.chat_chatroommember where user_id={2} and status='joined') t2 
                                                                on t1.id = t2.room_id""".format(DB_NAME,DB_NAME,request.user.id))
    ]
    return HttpResponse(json.dumps(result))

@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def room_messages(request,room_id):
    member = ChatRoomMember.objects.filter(room__id=room_id,user=request.user,status="joined").first()
    if member:
        message_objs = ChatMessage.objects.filter(send_from__room__id=room_id).order_by('created')
        result = []
        for message_obj in message_objs:
            if message_obj.send_from.status == "joined":
                sender_name = "{0} {1}".format(message_obj.send_from.user.first_name,message_obj.send_from.user.last_name)
            else:
                sender_name = "left member"
            result.append(
                {"sender_name":sender_name, 
                 "self": message_obj.send_from.user == request.user,
                "message":message_obj.message, 
                "send_time":message_obj.created.timestamp()*1000}
            )
        return HttpResponse(json.dumps(result))
    else:
        return HttpResponse('not a member',status=400)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def room_info(request,room_id):
    room = ChatRoom.objects.filter(id=room_id).first()
    if room:
        return HttpResponse(json.dumps({"id":room.id,"name":room.name}))
    else:
        return HttpResponse('no room',status=404)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def room_member(request,room_id):
    member = ChatRoomMember.objects.filter(room__id=room_id,user=request.user,status="joined").first()
    if member:
        member_objs = ChatRoomMember.objects.filter(room__id=room_id)
        result = []
        for member_obj in member_objs:
            if member_obj.status == "joined":
                name = "{0} {1}".format(member_obj.user.first_name,member_obj.user.last_name)
                result.append(
                    {"name":name}
                )
        return HttpResponse(json.dumps(result))
    else:
        return HttpResponse('not a member',status=400)
