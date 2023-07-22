from django.urls import path
from . import views
urlpatterns = [
    path('create_room',views.create_room,name="create_room"),
    path('delete_room',views.delete_room,name="delete_room"),
    path('join_room',views.join_room,name="join_room"),
    path('leave_room',views.leave_room,name="leave_room"),
    path('rooms',views.rooms,name='rooms'),
    path('room_info/<int:room_id>',views.room_info,name="room_info"),
    path('room_messages/<int:room_id>',views.room_messages,name="room_messages"),
    path('room_member/<int:room_id>',views.room_member,name="room_member")
]