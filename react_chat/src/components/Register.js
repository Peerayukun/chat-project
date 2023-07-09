import './Home.css'
import './Auth.css'
import homeLogo from '../assets/images/icons8-home-100.png'
const Register = () => {
    return (
        <div className="mainFrame">
        <a href='/'><img src={homeLogo} className='homeLogo' alt=''></img></a>
            <h1 className="titleChat">Register</h1>
            <input placeholder='username'></input>
            <input placeholder='email'></input>
            <input placeholder='firstname'></input>
            <input placeholder='lastname'></input>
            <input placeholder='password' type='password'></input>
            <input placeholder='confirm password' type='password'></input>
            <div>
                <button className="registerButton">
                    <a href="/register" className="buttonText">register</a>
                </button>
                <button className="loginButton">
                    <a href="/login" className="buttonText">log in</a>
                </button>
            </div>
        </div>
    );
  };
  
  export default Register;