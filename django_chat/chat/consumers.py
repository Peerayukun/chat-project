import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import *
import time

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'].is_anonymous:
            await self.close()
        else:
            self.user = self.scope['user']
            self.room_group_name = "chat_%s" % self.user.id

            # Join room group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)

            await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        room_id = text_data_json["roomId"]
        this_member = await self.this_member(room_id)
        if not this_member:
            return
        saved_message = await self.save_message(message,this_member)
        all_members = await self.query_user_in_room(room_id)
        for member in all_members:
            # Send message to room group
            await self.channel_layer.group_send(
                ("chat_%s" % member.id), {
                    "type": "chat_message", 
                    "message": message, 
                    "room_id":room_id, 
                    "sender_name":"{0} {1}".format(self.user.first_name,self.user.last_name), 
                    "self":member.id==self.user.id,
                    "send_time": saved_message.created.timestamp()*1000
                }
            )

    # Receive message from room group
    async def chat_message(self, event):

        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))

    @sync_to_async
    def this_member(self,room_id):
        member = ChatRoomMember.objects.filter(room__id=room_id,user=self.user,status="joined").first()
        return member
    
    @sync_to_async
    def save_message(self,message,member):
        new_message = ChatMessage.objects.create(send_from=member,message=message)
        return new_message

    @sync_to_async
    def query_user_in_room(self,room_id):
        members = ChatRoomMember.objects.filter(room__id=room_id,status="joined")
        return_list = []
        for member in members:
            return_list.append(member.user)
        return return_list