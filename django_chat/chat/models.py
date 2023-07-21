from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class ChatRoom(models.Model):
    name = models.CharField(max_length=255)
    is_public = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

class ChatRoomMember(models.Model):
    room = models.ForeignKey(ChatRoom,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

class ChatMessage(models.Model):
    send_from = models.ForeignKey(ChatRoomMember,on_delete=models.CASCADE)
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)