import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import {Sidebar} from "./chat_components/Sidebar"
import {Rooms} from "./chat_components/Rooms"
import {Chat} from "./chat_components/Chat"
import { useParams } from 'react-router-dom';

export const UserContext = createContext()
export const CsrftokenContext = createContext()
const Landing =()=> {
    const { roomId } = useParams();
    const [isAuth,setIsAuth] = useState(false)
    const [user,setUser] = useState({})
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
    },[])
    function getCsrftoken() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; csrftoken=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
    return (isAuth?
    <div style={{background: 'linear-gradient(to bottom, #c7aef7, #b0e0e6)',width: '100%',height: '100%', display:'flex'}}>
        <UserContext.Provider value={{user:user, setUser:setUser}}>
            <CsrftokenContext.Provider value={getCsrftoken}>
                <Sidebar />
                <Rooms />
                {roomId?<Chat roomId={roomId}/>:<></>}
            </CsrftokenContext.Provider>
        </UserContext.Provider>
        
    </div>
    :
    <div style={{position:"fixed", top:"0", width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
    <div className="loader"></div>
    </div>)
}

export default Landing