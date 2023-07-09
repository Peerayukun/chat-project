import './Home.css'
import './Auth.css'
import homeLogo from '../assets/images/icons8-home-100.png'
import { useState } from 'react';
const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [matchPassword, setMatchPassword] = useState(true)
    function handlePassword(confirmPassword){
        setMatchPassword(confirmPassword === password)
        setConfirm(confirmPassword)
    }
    function submitRegisterPayload(){
        const payload = {
            'username':username,
            'email':email,
            'firstname':firstname,
            'lastname':lastname,
            'password':password
        }
        console.log(payload)
    }
    return (
        <div className="mainFrame">
        <a href='/'><img src={homeLogo} className='homeLogo' alt=''></img></a>
            <h1 className="titleChat">Register</h1>
            <input placeholder='username' onChange={(event)=>{setUsername(event.target.value)}}></input>
            <input placeholder='email' onChange={(event)=>{setEmail(event.target.value)}}></input>
            <input placeholder='firstname' onChange={(event)=>{setFirstname(event.target.value)}}></input>
            <input placeholder='lastname' onChange={(event)=>{setLastname(event.target.value)}}></input>
            <input placeholder='password' type='password' onChange={(event)=>{setPassword(event.target.value);setConfirm('');}}></input>
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
        </div>
    );
  };
  
  export default Register;