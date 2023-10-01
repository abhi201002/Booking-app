import React, { useState } from 'react'
import { useFetch } from './useFetch'
import { useDataValue } from './Datalayer'
import './reserve.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

function Reserve({setOpen, hotelId}) {
    const [state, dispatch] = useDataValue()
    const [selected, setSelected] = useState([])
    const {data, loading, error} = useFetch(`http://localhost:8800/api/hotels/rooms/${hotelId}`)
    const handleSelect = (e) =>{
        const check = e.target.checked;
        const value = e.target.value;
        if(check){
            setSelected(
                [...selected, value]
            )
        }
        else{
            setSelected(
                selected.filter((id) =>{
                    return id !== value
                })
            )
        }
    }
    const DateTiming = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        // console.log(start)
        let list = []
        while(start <= end){
            list.push(new Date(start).getTime())
            start.setDate(start.getDate() + 1)
        }
        return list
    }
    const reserved_date = DateTiming(state.dates[0].startDate, state.dates[0].endDate)
    console.log(`Reserved Dates are :${reserved_date}`)
    const isAvailable = (roomNumber) =>{
        console.log(`Unavailable Dates are :`)
        const isFound = roomNumber.unavailableDates.some(date =>{
            console.log(new Date(date).getTime())
            return reserved_date.includes(new Date(date).getTime())
        })

        return !isFound;
    }
    const handleClick = async (e) =>{
        setOpen(false)
        await Promise.all(
            selected.map((room) =>{
                const res = axios.put(`http://localhost:8800/api/rooms/availability/${room}`, {dates: reserved_date})
            })
        )
        .catch((mes)=>{
            alert("Error Please Try Again Later!", mes)
        }
        )
        // try{
        // }
    }
  return (
    <div className="Reserve">
        <div className="reserveContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="close" size='xl' style = {{color: "#0071C2"}} onClick={() =>{setOpen(false)}}/>
            {/* <div className="reserveClose" onClick={() => {setOpen(false)}}>Close</div> */}
            <span>Select your Rooms: </span>
            {data.map((item) =>(
                <>
                <div className="reserveItem">
                    <div className="reserveItemInfo">
                        <div className="reserveTitle">{item.title}</div>
                        <div className="reserveDesc">{item.desc}</div>
                        <div className="reserveMax">Max People: <b>{item.maxPeople}</b></div>
                        <div className="reservePrice"><b>$</b> {item.price}</div>
                    </div>
                    {item.roomNumbers.map((room) => (
                    <>
                        {/* {console.log(room.unavailableDates)} */}
                        <div className="reserveRooms">
                            <label htmlFor="">{room.number}</label>
                            <input type="checkbox" value = {room._id} onChange={handleSelect} disabled = {! isAvailable(room)}/>
                        </div>
                    </>
                    ))}
                </div>
                <hr />
                </>
            ))}
            <button className="reserveButton" onClick={handleClick}>Book Now !</button>
        </div>
    </div>
  )
}

export default Reserve