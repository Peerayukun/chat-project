import "./Home.css"
import chatLogo from "../assets/images/icons8-chat-96.png"
const Home = () => {
    return (
        <div className="mainFrame">
            <h1 className="titleChat">React chat</h1>
            <img src={chatLogo} id="chatLogo" alt=""></img>
            <p className="about">Welcome to my chat application.</p>
            <p className="about">This web app is developed by react.</p>
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
  
  export default Home;