import './Rooms.css'
import { Card } from './Card'
import { useContext, useEffect, useState } from 'react'
import { CsrftokenContext } from '../Landing'
import { API_BASE_URL } from '../../config'
import axios from 'axios'

export const Rooms =()=>{
    const getCsrftoken = useContext(CsrftokenContext)
    const [joinedRoom,setJoinedRoom] = useState([])
    const [publicRoom,setPublicRoom] = useState([])
    useEffect(()=>{
        async function callRooms(){
            let joinedRoomRes = []
            let publicRoomRes = []
            try{
            const roomRes = await axios.get(`${API_BASE_URL}/chat/rooms`,{withCredentials:true})
            roomRes.data.forEach(element => {
                if(element.type === 'joined'){
                    joinedRoomRes.push({roomId:element.id, roomName:element.name})
                }
                else if(element.type === 'public'){
                    publicRoomRes.push({roomId:element.id, roomName:element.name})
                }
            });
            }
            catch(error){
                console.log(error)
            }
            setJoinedRoom(joinedRoomRes)
            setPublicRoom(publicRoomRes)
        }
        callRooms()
    },[])
    return (
    <div className='roomsFrame'>
        <div className='roomsContainer'>
            <div style={{width:'100%',display:'flex', alignItems:'center', justifyContent: 'end'}}>
                <div className='roomsNumberManager plus'>+</div>
                <div className='roomsNumberManager minus'>-</div>
            </div>
            <h3>Joined</h3>
            <div id="joined-room" className='cardContainer'>
                {joinedRoom.map(element=><Card room={element} key={element.roomId}/>)}
            </div>
            <h3>Public</h3>
            <div id="public-room" className='cardContainer'>
                {publicRoom.map(element=><Card room={element} key={element.roomId}/>)}
            </div>
        </div>
    </div>)
}