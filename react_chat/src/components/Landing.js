import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import {Sidebar} from "./chat_components/Sidebar"
import {Rooms} from "./chat_components/Rooms"
import {Chat} from "./chat_components/Chat"

const Landing =()=> {
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
    return (isAuth?
    <>
        <Sidebar />
        <Rooms />
        <Chat />
    </>
    :<p>loading...</p>)
}

export default Landing;