import './Rooms.css'
import { Card } from './Card'
export const Rooms =()=>{
    return (
    <div className='roomsFrame'>
        <div className='roomsContainer'>
            <div style={{width:'100%',display:'flex', alignItems:'center', justifyContent: 'end'}}>
                <div className='roomsNumberManager plus'>+</div>
                <div className='roomsNumberManager minus'>-</div>
            </div>
            <h3>Joined</h3>
            <div id="joined-room" className='cardContainer'>
                <Card/>
            </div>
            <h3>Public</h3>
            <div id="public-room" className='cardContainer'>
                <Card/>
            </div>
        </div>
    </div>)
}