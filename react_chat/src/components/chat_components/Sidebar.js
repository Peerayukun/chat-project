import axios from "axios"
import { API_BASE_URL } from "../../config"
import './Sidebar.css'
import defaultProfilePic from "../../assets/images/profile.png"
import { useContext, useState } from "react";
import { UserContext, CsrftokenContext } from "../Landing";

export const Sidebar =()=>{
    const user = useContext(UserContext).user;
    const setUser = useContext(UserContext).setUser;
    const getCsrftoken = useContext(CsrftokenContext)
    const [isSetting,setIsSetting] = useState(false)
    const [newFirstname,setNewFirstname] = useState(user.firstname)
    const [newLastname,setNewLastname] = useState(user.lastname)

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
    async function changeName(){
        try{
            const resonse = await axios.post(`${API_BASE_URL}/auth/update_profile`,{firstname:newFirstname,lastname:newLastname},{withCredentials: true, headers:{'X-CSRFToken':getCsrftoken()}})
            const newUser = user
            newUser.firstname = resonse.data.firstname
            newUser.lastname = resonse.data.lastname
            setUser(newUser)
            setIsSetting(false)
        }
        catch(error){
            console.log(error.response.status)
        }
    }
    return (
    <>
        <div className="sidebarFrame">
            <div className="sidebarContainer">
                <img src={defaultProfilePic} alt="" className="profilePic"></img>
                {isSetting?
                <><input style={{marginTop:"10px"}} value={newFirstname ? newFirstname: ""} onChange={(event)=>{setNewFirstname(event.target.value)}}></input>
                <input value={newLastname ? newLastname: ""} onChange={(event)=>{setNewLastname(event.target.value)}}></input>
                <button style={{backgroundColor:"#b0e0e6"}} className="authButton" onClick={changeName}>submit</button></>:
                <p style={{marginTop:'20px', color:'white'}}>{user.firstname ? user.firstname: ""} {user.lastname ? user.lastname: ""}</p>}
                <div className="sidebarElement" onClick={()=>{setIsSetting(!isSetting)}}>setting</div>
                <div className="sidebarElement" onClick={()=>{logout()}}>log out</div>
            </div>
        </div>
    </>
    )
}