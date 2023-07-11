import './Home.css'
import './Auth.css'
import homeLogo from '../assets/images/icons8-home-100.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
const Login = () => {
    const [isCheckingAuth,setIsCheckingAuth] = useState(true)
    useEffect(()=>{
        try{
            axios.get(`${API_BASE_URL}/auth/test`,{withCredentials: true})
            window.location.replace('/chat')
        }
        catch{
            setIsCheckingAuth(false)
        }
    },[])
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submitLoginPayload(){
        const payload = {'usernameOrEmail':usernameOrEmail, 'password':password }
        try{
            await axios.post(`${API_BASE_URL}/auth/login`,payload,{ withCredentials: true })
            window.location.replace('/chat')
        }
        catch(error){
            alert('log in fail')
        }
    }
    return (isCheckingAuth?<p>loading...</p>:
        <div className="mainFrame">
            <a href='/'><img src={homeLogo} className='homeLogo' alt=''></img></a>
            <h1 className="titleChat">Log in</h1>
            <input placeholder='username or email' onChange={(event)=>{setUsernameOrEmail(event.target.value)}}></input>
            <input placeholder='password' type='password' onChange={(event)=>{setPassword(event.target.value)}}></input>
            <div>
                <a href="/register" className="buttonText">
                    <button className="registerButton">
                        register
                    </button>
                </a>
                <button className="loginButton"  onClick={()=>{submitLoginPayload()}}>
                    log in
                </button>
            </div>
        </div>
    );
  };
  
  export default Login;