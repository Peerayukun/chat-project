import axios from "axios"
import { API_BASE_URL } from "../../config"
export const Sidebar =()=>{
    async function logout(){
        try{
            await axios.get(`${API_BASE_URL}/auth/logout`,{withCredentials: true})
            window.location.replace('/')
        }
        catch(error){
            console.log(error.response.status, error.response.statusText)
        }
    }
    return (
    <>
        <button onClick={()=>{logout()}}>log out</button>
    </>
    )
}