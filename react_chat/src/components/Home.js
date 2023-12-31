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
            <a href="/register" className="buttonText">
                    <button className="authButton registerButton">
                        register
                    </button>
                </a>
                <a href="/login" className="buttonText">
                    <button className="authButton loginButton">
                        log in
                    </button>
                </a>
            </div>
        </div>
    );
  };
  
  export default Home;