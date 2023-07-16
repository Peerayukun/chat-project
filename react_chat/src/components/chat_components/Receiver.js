import defaultProfilePic from "../../assets/images/profile.png"

export const Receiver =()=>{
    const now = new Date()
    return(
        <div className='receiver'>
            <div className='messagerPic' style={{marginRight:'10px'}}>
                <img src={defaultProfilePic} alt=''  style={{widows:'35px', height:'35px'}}></img>
            </div>
            <div className="messageBubble" style={{backgroundColor:'#c7aef7', marginRight:'5px'}}>
                <p style={{fontSize:'12px', textAlign: 'center', color: 'white'}}>message from other</p>
            </div>
            <p className="messageSendTime">{now.toDateString()}<br/>{now.toLocaleTimeString()}</p>
        </div>   
    )
}