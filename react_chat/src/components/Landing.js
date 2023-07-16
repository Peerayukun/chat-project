import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import {Sidebar} from "./chat_components/Sidebar"
import {Rooms} from "./chat_components/Rooms"
import {Chat} from "./chat_components/Chat"

const Landing =()=> {
    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        async function checkAuth(){
            try{
                const response = await axios.get(`${API_BASE_URL}/auth/user`,{withCredentials: true})
                if(response.data.isAuthenticated){
                    setIsAuth(true)
                    console.log(response.data.user)
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
    return (isAuth?
    <div style={{background: 'linear-gradient(to bottom, #c7aef7, #b0e0e6)',width: '100%',height: '100%', display:'flex'}}>
        <Sidebar />
        <Rooms />
        <Chat />
    </div>
    :<div className="loader"></div>)
}

export default Landing;