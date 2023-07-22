import defaulRoomPic from "../../assets/images/icons8-chat-48.png"
export const Card =({room})=>{
    return (
        <a href={`${window.location.origin}/chat/${room.roomId}`} style={{textDecoration:"none"}}>
        <div className='card'>
            <div className="roomPic">
                <img src={defaulRoomPic} alt='' style={{widows:'35px', height:'35px'}}></img>
            </div>
            <div>{room.roomName}</div>
        </div>
        </a>
    )
}