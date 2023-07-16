import defaulRoomPic from "../../assets/images/icons8-chat-48.png"
export const Card =()=>{
    return (
        <div className='card'>
            <div className="roomPic">
                <img src={defaulRoomPic} alt='' style={{widows:'35px', height:'35px'}}></img>
            </div>
            <div>room name</div>
        </div>
    )
}