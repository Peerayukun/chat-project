import { useState, useContext } from "react"
import { CsrftokenContext } from "../Landing"
import { API_BASE_URL } from '../../config'
import axios from 'axios'

export const PopupCreateRoom=({props})=>{
    const getCsrftoken = useContext(CsrftokenContext)
    const [createRoomName,setCreateRoomName] = useState('')
    async function requestCreateRoom(){
        try{
            const response = await axios.post(`${API_BASE_URL}/chat/create_room`,{roomName:createRoomName}
            ,{
                withCredentials:true,
                headers:{'X-CSRFToken':getCsrftoken()}
            })
            window.location.replace(`${window.location.origin}/chat/${response.data}`)
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div className="popupBackground">
            <div className="popupBox">
                <div style={{textAlign:"center"}}>create room</div>
                <input placeholder="room name" style={{border:"solid"}} onChange={(event)=>{setCreateRoomName(event.target.value)}} value={createRoomName}></input>
                <div>
                <button style={{backgroundColor:"#3498db"}} onClick={requestCreateRoom}>confirm</button>
                <button style={{backgroundColor:"red"}} onClick={props.handleCancel}>cancel</button>
                </div>
            </div>
        </div>
    )
}