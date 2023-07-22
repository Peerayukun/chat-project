import defaultProfilePic from "../../assets/images/profile.png"

export const Receiver =({props})=>{
    const sendTime = new Date(props.send_time)
    return(
        <div className='receiver'>
        <div style={{textAlign:"left"}} className="seidTextMessage">{props.sender_name}</div>
        <div className='receiverFlex'>
            <div className='messagerPic' style={{marginRight:'10px'}}>
                <img src={defaultProfilePic} alt=''  style={{widows:'35px', height:'35px'}}></img>
            </div>
            <div className="messageBubble" style={{backgroundColor:'#c7aef7', marginRight:'5px'}}>
                <p style={{fontSize:'12px', textAlign: 'center', color: 'white'}}>{props.message}</p>
            </div>
            <p className="seidTextMessage">{sendTime.toDateString()}<br/>{sendTime.toLocaleTimeString()}</p>
        </div>   
        </div>
    )
}