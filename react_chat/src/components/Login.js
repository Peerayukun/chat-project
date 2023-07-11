import './Home.css'
import './Auth.css'
import homeLogo from '../assets/images/icons8-home-100.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
const Login = () => {
    const [isCheckingAuth,setIsCheckingAuth] = useState(true)
    useEffect(()=>{
        async function checkAuth(){
           try{
                const response = await axios.get(`${API_BASE_URL}/auth/user`,{withCredentials: true})
                if(response.data.isAuthenticated){
                    window.location.replace('/chat')
                }
                else{
                    setIsCheckingAuth(false)
                }
            }
            catch{
                setIsCheckingAuth(false)
            }
        }
        checkAuth()
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
    return (
        <div className="mainFrame">
            {isCheckingAuth?<div class="loader"></div>:
            <>
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
            </>
            }
        </div>
    );
  };
  
  export default Login;