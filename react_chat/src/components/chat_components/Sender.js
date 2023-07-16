import defaultProfilePic from "../../assets/images/profile.png"

export const Sennder =()=>{
    const now = new Date()
    return(
        <div className='sender'>
            <div className='messagerPic' style={{marginLeft:'10px'}}>
                <img src={defaultProfilePic} alt=''  style={{widows:'35px', height:'35px'}}></img>
            </div>
            <div className="messageBubble" style={{backgroundColor:'#b0e0e6', marginLeft:'5px'}}>
                <p style={{fontSize:'12px', textAlign: 'center', color: 'black'}}>your message</p>
            </div>
            <p className="messageSendTime">{now.toDateString()}<br/>{now.toLocaleTimeString()}</p>
        </div>   
    )
}