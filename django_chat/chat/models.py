from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class ChatRoom(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

member_status_choices = [("joined","joined"),("left","left")]
class ChatRoomMember(models.Model):
    room = models.ForeignKey(ChatRoom,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.CharField(max_length=20,choices=member_status_choices,default="joined")

    class Meta:
        unique_together = ('room', 'user',)

class ChatMessage(models.Model):
    send_from = models.ForeignKey(ChatRoomMember,null=True,on_delete=models.SET_NULL)
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)