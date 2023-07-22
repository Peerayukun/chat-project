import './Rooms.css'
import { Card } from './Card'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config'
import axios from 'axios'

export const Rooms =({openPopupCreateRoom})=>{
    const [joinedRoom,setJoinedRoom] = useState([])
    const [publicRoom,setPublicRoom] = useState([])
    const [delMode,setDelMode] = useState(false)
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
                <div className='roomsNumberManager plus' onClick={openPopupCreateRoom}>+</div>
                <div className='roomsNumberManager minus' onClick={()=>{setDelMode(!delMode)}}>-</div>
            </div>
            <h3>Joined</h3>
            <div id="joined-room" className='cardContainer'>
                {joinedRoom.map(element=><Card room={element} key={element.roomId} canDelete={true} delMode={delMode}/>)}
            </div>
            <h3>Public</h3>
            <div id="public-room" className='cardContainer'>
                {publicRoom.map(element=><Card room={element} key={element.roomId} canDelete={false} delMode={delMode}/>)}
            </div>
        </div>
    </div>)
}