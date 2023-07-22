import defaulRoomPic from "../../assets/images/icons8-chat-48.png"
import axios from "axios"
import { useContext, useState } from "react"
import { API_BASE_URL } from "../../config"
import { CsrftokenContext } from "../Landing"

export const Card =({room, canDelete, delMode})=>{
    const getCsrftoken = useContext(CsrftokenContext)
    const [isExist,setIsExist] = useState(true)
    async function deleteRoom(roomId){
        try{
            await axios.post(`${API_BASE_URL}/chat/delete_room`,{roomId:roomId}
            ,{
                withCredentials:true,
                headers:{'X-CSRFToken':getCsrftoken()}
            })
            setIsExist(false)
        }
        catch(error){   
            console.log(error)   
        }     
    }
    return (
        <>{
        isExist?
        <div style={{display:"flex", alignItems:"center", height:'50px'}}>
        <a href={`${window.location.origin}/chat/${room.roomId}`} style={{textDecoration:"none", width:"100%"}}>
        <div className='card'>
            <div className="roomPic">
                <img src={defaulRoomPic} alt='' style={{widows:'35px', height:'35px'}}></img>
            </div>
            <div>{room.roomName}</div>
        </div>
        </a>
        {(canDelete && delMode)?<div className="cardDel" onClick={()=>{deleteRoom(room.roomId)}}>del</div>:<></>}
        </div>:<></>
        }
        </>
    )
}