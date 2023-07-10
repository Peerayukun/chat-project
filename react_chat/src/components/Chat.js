import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
const Chat =()=> {
    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        try{
            axios.get(`${API_BASE_URL}/auth/test`,{withCredentials: true})
            setIsAuth(true)
        }
        catch{
            window.location.replace('/login')
        }
    },[])
    return (isAuth?<h1>Chat</h1>:<p>loading...</p>)
}

export default Chat;