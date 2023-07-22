import defaultProfilePic from "../../assets/images/profile.png"

export const Sennder =({props})=>{
    const sendTime = new Date(props.send_time)
    return(
        <div className='sender'>
        <div className='senderFlex'>
            <div className='messagerPic' style={{marginLeft:'10px'}}>
                <img src={defaultProfilePic} alt=''  style={{widows:'35px', height:'35px'}}></img>
            </div>
            <div className="messageBubble" style={{backgroundColor:'#b0e0e6', marginLeft:'5px'}}>
                <p style={{fontSize:'12px', textAlign: 'center', color: 'black'}}>{props.message}</p>
            </div>
            <p className="seidTextMessage">{sendTime.toDateString()}<br/>{sendTime.toLocaleTimeString()}</p>
        </div>  
        </div> 
    )
}