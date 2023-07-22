import './Chat.css'
import defaulRoomPic from "../../assets/images/icons8-chat-48.png"
import { Receiver } from './Receiver'
import { Sennder } from './Sender'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config'

export const Chat =({roomId})=>{
    const [messages,setMessages] = useState([])
    useEffect(()=>{
        async function initChatRoom(){
            let messages_res = []
            try{
                const response = await axios.get(`${API_BASE_URL}/chat/room_messages/${roomId}`,{withCredentials: true})
                messages_res = response.data
            }
            catch(error){
                console.log(error)
                // window.location.replace('/')
            }
            setMessages(messages_res)
        }
        initChatRoom()
    },[])
    return (
    <div className='chatFrame'>
        <div className='chatContainer'>
            <div className='chatHeader'>
                <div className="chatRoomPic">
                    <img src={defaulRoomPic} alt='' style={{widows:'35px', height:'35px'}}></img>
                </div>
                <div>room name</div>
                <div className='chatClose'>x</div>
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
                </div>
            </div>
        </div>
    </div>
    )
}