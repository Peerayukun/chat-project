import './Home.css'
import './Auth.css'
import homeLogo from '../assets/images/icons8-home-100.png'
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios'
const Register = () => {
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
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [matchPassword, setMatchPassword] = useState(true)
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    function handlePassword(confirmPassword){
        setMatchPassword(confirmPassword === password)
        setConfirm(confirmPassword)
    }
    async function submitRegisterPayload(){
        const body = {
            'username':username,
            'email':email,
            'firstname':firstname,
            'lastname':lastname,
            'password':password
        }
        try{
            await axios.post(`${API_BASE_URL}/auth/register`,body)
            window.location.replace('/login')
        }
        catch(error){
            const errorInputs = error.response.data.error
            if(errorInputs.includes('username') || errorInputs.includes('duplicate username')){
                if (errorInputs.includes('username')){
                    alert('invalid format of username (must be alphanumeric)')
                }
                else{
                    alert('duplicate username')
                }
                setUsernameError(true)
            }
            if(errorInputs.includes('email') || errorInputs.includes('duplicate email')){
                if (errorInputs.includes('email')){
                    alert('invalid format of email')
                }
                else{
                    alert('duplicate email')
                }
                setEmailError(true)
            }
            if(errorInputs.includes('password')){
                alert('password is empty')
                setPasswordError(true)
            }
        }
    }
    return (
        <div className="mainFrame">
            {isCheckingAuth?<div class="loader"></div>:
            <>
            <a href='/'><img src={homeLogo} className='homeLogo' alt=''></img></a>
            <h1 className="titleChat">Register</h1>
            <input placeholder='username' 
            onChange={(event)=>{setUsername(event.target.value);setUsernameError(false);}}
            className={usernameError?'errorInput':''}></input>
            <input placeholder='email' onChange={(event)=>{setEmail(event.target.value);setEmailError(false);}}
            className={emailError?'errorInput':''}></input>
            <input placeholder='firstname' onChange={(event)=>{setFirstname(event.target.value)}}></input>
            <input placeholder='lastname' onChange={(event)=>{setLastname(event.target.value)}}></input>
            <input placeholder='password' type='password' onChange={(event)=>{setPassword(event.target.value);setConfirm('');setPasswordError(false);}}
            className={passwordError?'errorInput':''}></input>
            <input placeholder='confirm password' 
            className={matchPassword?'':'errorInput'} 
            type='password' 
            onChange={(event)=>{handlePassword(event.target.value)}} 
            value={confirm}></input>
            <div>
                <button className="registerButton" onClick={()=>{submitRegisterPayload()}} disabled={!matchPassword}>
                    register
                </button>
                <a href="/login" className="buttonText">
                    <button className="loginButton">
                        log in
                    </button>
                </a>
            </div>
            </>}
        </div>
    );
  };
  
  export default Register;