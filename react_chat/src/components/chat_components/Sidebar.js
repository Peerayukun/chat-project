import axios from "axios"
import { API_BASE_URL } from "../../config"
import './Sidebar.css'
import defaultProfilePic from "../../assets/images/profile.png"
import { useContext } from "react";
import { UserContext } from "../Landing";

export const Sidebar =()=>{
    const user = useContext(UserContext).user;
    const setUser = useContext(UserContext).setUser;
    async function logout(){
        try{
            await axios.get(`${API_BASE_URL}/auth/logout`,{withCredentials: true})
            setUser({})
            window.location.replace('/')
        }
        catch(error){
            console.log(error.response.status, error.response.statusText)
        }
    }
    return (
    <>
        <div className="sidebarFrame">
            <div className="sidebarContainer">
                <img src={defaultProfilePic} alt="" className="profilePic"></img>
                <p style={{marginTop:'20px', color:'white'}}>{user.firstname ? user.firstname: ""} {user.lastname ? user.lastname: ""}</p>
                <div className="sidebarElement" onClick={()=>{}}>setting</div>
                <div className="sidebarElement" onClick={()=>{logout()}}>log out</div>
            </div>
        </div>
    </>
    )
}