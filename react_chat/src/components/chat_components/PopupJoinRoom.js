import { useContext } from "react"
import { CsrftokenContext } from "../Landing"
import { API_BASE_URL } from '../../config'
import axios from 'axios'
export const PopupJoinRoom=({props})=>{
    const getCsrftoken = useContext(CsrftokenContext)
    function cancel(){
        props.setIsPopupJoinRoom(false)
        window.location.replace('/chat')
    }
    async function requestJoinRoom(){
        try{
            await axios.post(`${API_BASE_URL}/chat/join_room`,{roomId:props.roomId}
            ,{
                withCredentials:true,
                headers:{'X-CSRFToken':getCsrftoken()}
            })
            window.location.reload()
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div className="popupBackground">
            <div className="popupBox">
                <div style={{textAlign:"center"}}>{props.title}</div>
                <div>
                <button style={{backgroundColor:"#3498db"}} onClick={requestJoinRoom}>confirm</button>
                <button style={{backgroundColor:"red"}} onClick={cancel}>cancel</button>
                </div>
            </div>
        </div>
    )
}