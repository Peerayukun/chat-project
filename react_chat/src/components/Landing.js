import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { API_BASE_URL, WS_BASE_URL } from "../config";
import {Sidebar} from "./chat_components/Sidebar"
import {Rooms} from "./chat_components/Rooms"
import {Chat} from "./chat_components/Chat"
import { useParams } from 'react-router-dom';
import { PopupJoinRoom } from "./chat_components/PopupJoinRoom";
import { PopupCreateRoom } from "./chat_components/PopupCreateRoom";

export const UserContext = createContext()
export const CsrftokenContext = createContext()
export const SocketContext = createContext()
const Landing =()=> {
    const { roomId } = useParams()
    const [roomInfo,setRoomInfo] = useState({})
    const [isAuth,setIsAuth] = useState(false)
    const [user,setUser] = useState({})
    const [isPopupJoinRoom,setIsPopupJoinRoom] = useState(false)
    const [isPopupCreateRoom,setIsPopupCreateRoom] = useState(false)
    const [socket, setSocket] = useState(null)
    const [messages,setMessages] = useState([])

    useEffect(()=>{
        async function checkAuth(){
            try{
                const response = await axios.get(`${API_BASE_URL}/auth/user`,{withCredentials: true})
                if(response.data.isAuthenticated){
                    setIsAuth(true)
                    setUser(response.data.user)
                }
                else{
                    window.location.replace('/login')
                }
            }
            catch{
                window.location.replace('/login')
            }
        }
        checkAuth()

        
        const newSocket = new WebSocket(WS_BASE_URL)
        newSocket.onopen = () => {
            console.log('WebSocket connected')
          }
        newSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data)
            if(newMessage.room_id === roomId){
                setMessages((messages)=>[...messages,newMessage])
            }
        };
        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error)
        };

        newSocket.onclose = () => {
            console.log('WebSocket disconnected')
        };

        setSocket(newSocket)

        return () => {
            newSocket.close()
          }
    },[])
    function getCsrftoken() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; csrftoken=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
    return (isAuth?
    <>
    <UserContext.Provider value={{user:user, setUser:setUser}}>
    <CsrftokenContext.Provider value={getCsrftoken}>
    <SocketContext.Provider value={socket}>
            <div style={{background: 'linear-gradient(to bottom, #c7aef7, #b0e0e6)',width: '100%',height: '100%', display:'flex'}}>
                        <Sidebar />
                        <Rooms openPopupCreateRoom={()=>{setIsPopupCreateRoom(true)}}/>
                        {roomId?<Chat 
                        roomId={roomId} 
                        roomInfo={roomInfo} 
                        setRoomInfo={setRoomInfo} 
                        setIsPopupJoinRoom={setIsPopupJoinRoom}
                        messages={messages}
                        setMessages={setMessages}
                        />:<></>}
            </div>
            {isPopupJoinRoom?<PopupJoinRoom props={{setIsPopupJoinRoom:setIsPopupJoinRoom, title:`join ${roomInfo.name}`, roomId:roomInfo.id}}/>:<></>}
            {isPopupCreateRoom?<PopupCreateRoom props={{handleCancel:()=>{setIsPopupCreateRoom(false)}}} />:<></>}
    </SocketContext.Provider>
    </CsrftokenContext.Provider>
    </UserContext.Provider>
    </>
    :
    <div style={{position:"fixed", top:"0", width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
    <div className="loader"></div>
    </div>)
}

export default Landing