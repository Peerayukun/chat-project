import './Home.css'
import './Auth.css'
import homeLogo from '../assets/images/icons8-home-100.png'
import { useState } from 'react';
const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    function submitLoginPayload(){
        const payload = {'usernameOrEmail':usernameOrEmail, 'password':password}
        console.log(payload)
    }
    return (
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