import './Chat.css'
import defaulRoomPic from "../../assets/images/icons8-chat-48.png"
import { Receiver } from './Receiver'
import { Sennder } from './Sender'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { API_BASE_URL } from '../../config'
import { CsrftokenContext } from '../Landing'

export const Chat =({roomId, roomInfo, setRoomInfo, setIsPopupJoinRoom})=>{
    const getCsrftoken = useContext(CsrftokenContext)
    const [messages,setMessages] = useState([])
    const [members,setMembers] = useState([])
    useEffect(()=>{
        async function initChatRoom(){
            let messagesData = []
            let membersData = []
            try{
                const infoResponse = await axios.get(`${API_BASE_URL}/chat/room_info/${roomId}`,{withCredentials: true})
                setRoomInfo(infoResponse.data)
                const messageResponse = await axios.get(`${API_BASE_URL}/chat/room_messages/${roomId}`,{withCredentials: true})
                messagesData = messageResponse.data
                const memberResponse = await axios.get(`${API_BASE_URL}/chat/room_member/${roomId}`,{withCredentials: true})
                membersData = memberResponse.data
            }
            catch(error){
                if(error.response.data === 'no room'){
                    window.location.replace('/chat')
                }
                else if(error.response.data === 'not a member'){
                    setIsPopupJoinRoom(true)
                }
                else{
                    setIsPopupJoinRoom(false)
                }
            }
            setMessages(messagesData)
            setMembers(membersData)
        }
        initChatRoom()
    },[])
    async function leaveRoom(){
        try{
            await axios.post(`${API_BASE_URL}/chat/leave_room`,{roomId:roomId}
            ,{
                withCredentials:true,
                headers:{'X-CSRFToken':getCsrftoken()}
            })
            window.location.replace(`${window.location.origin}/chat`)
        }
        catch(error){
            console.log(error)
        }
    }
    return (
    <div className='chatFrame'>
        <div className='chatContainer'>
            <div className='chatHeader'>
                <div className="chatRoomPic">
                    <img src={defaulRoomPic} alt='' style={{widows:'35px', height:'35px'}}></img>
                </div>
                <div>{roomInfo.name}</div>
                <select style={{fontFamily:"Mitr", marginLeft:"10px"}}>
                    <option>member</option>
                    {members.map((element,index)=><option disabled={true} key={`member ${index}`}>{element.name}</option>)}
                </select>
                <div className='chatClose' title='leave' onClick={leaveRoom}>&#8687;</div>
            </div> 
            <div className='chatBody'>
                {messages.map(element=>{
                    if(element.self){
                        return <Sennder props={element} key={`${element.sender_name} ${element.send_time}`}/>
                    }
                    else{
                         return <Receiver props={element} key={`${element.sender_name} ${element.send_time}`}/>
                    }
                })}
            </div>  
            <div className='chatFooter'>
                <textarea className='inputMessage' placeholder='Type it here...'></textarea>
                <div className='sendIconOut'>
                &#10148;
                </div>
            </div>
        </div>
    </div>
    )
}