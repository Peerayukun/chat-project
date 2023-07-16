import './Chat.css'
import defaulRoomPic from "../../assets/images/icons8-chat-48.png"
import { Receiver } from './Receiver'
import { Sennder } from './Sender'
export const Chat =()=>{
    return (
    <div className='chatFrame'>
        <div className='chatContainer'>
            <div className='chatHeader'>
                <div className="chatRoomPic">
                    <img src={defaulRoomPic} alt='' style={{widows:'35px', height:'35px'}}></img>
                </div>
                <div>room name</div>
                <div className='chatClose'>x</div>
            </div> 
            <div className='chatBody'>
                 <Receiver/>
                 <Sennder/>
            </div>  
            <div className='chatFooter'>
                <textarea className='inputMessage' placeholder='Type it here...'></textarea>
                <div className='sendIconOut'>
                </div>
            </div>
        </div>
    </div>
    )
}