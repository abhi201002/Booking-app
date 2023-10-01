import React, { useState } from 'react'
import './header.css'
import Option from './Option'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useDataValue } from './Datalayer';
import Images from './Images';

function Header({type}) {
    const navigate = useNavigate()
    const [state, dispatch] = useDataValue()
    const [destination, setDestination] = useState("")
    const [openDate, setopenDate] = useState(false)
    const [openOption, setopenOption] = useState(false)
    const [option, setoption] = useState({
        adults: 0,
        children: 0,
        rooms: 0
    })
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const handleclick = () =>{
        if(openDate){
            setopenDate(false)
        }
        else{
            setopenDate(true)
            setopenOption(false)
        }
    }
    const handleoption = () =>{
        if(openOption){
            setopenOption(false)
        }
        else{
            setopenOption(true)
            setopenDate(false)
        }
    }
    const increment = (name) => {
        setoption(() => {
            return{
                ...option,
                [name]: option[name] + 1
            }
        });
    }
    const decrement = (name) => {
        if(option[name] === 0) return 
        setoption(() => {
            return{
                ...option,
                [name]: option[name] - 1
            }
        });
        setopenOption(true)
        return;
    }
    const handleRedirect = () =>{
        if(!destination){
            alert("Please Enter Destination !!")
            return
        }
        if(!date){
            alert("Please specify the date")
            return 
        }
        localStorage.setItem("details", JSON.stringify({destination, date, option}))
        console.log(`This is ${localStorage.getItem("details")}`)
        dispatch({type: "NEW_SEARCH"})
        navigate("/hotels", {state: {destination, date, option}})
    }
    return (
        <div className="header">
            <div className="header-container">
            {/* <ul className='options'>
                <li><Option title={"Stays"} /></li>
                <li><Option title={"Flights"} /></li>
                <li><Option title={"Car Rentals"} /></li>
                <li><Option title={"Airport Taxi"} /></li>
            </ul> */}
            {type != 'list' &&
            <>
            <Images/>
                {/* <div className="header-desc">
                    <p className="desc">Are You Yearning for Unbeatable Discounts and Unbelievable Savings on Your Bookings?</p>
                    <p className="desc2">Don't worry we got you. Get heavy discounts on every booking! Discover a World of Savings at Every Booking with Us</p>
                    <button className="btn btn-header btn-option">Sign In/Register</button>
                </div> */}
                <div className="search-header">
                    <div className="search-item">
                        <input 
                        type="text" 
                        placeholder='Where to ?' 
                        className=''
                        onChange={(e) => {setDestination(e.target.value)}}/>
                    </div>
                    <div className="search-item" onClick={() => {handleclick()}}>
                        <span>
                            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy"
                            )}`}
                        </span>
                    </div>
                    {openDate && 
                        (<DateRange
                            editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date"
                        minDate={new Date()}
                        />)
                    }
                    <div className="search-item" onClick={() => {handleoption()}}>
                        <span>{option.adults} Adults . {option.children} Children . {option.rooms} Rooms</span>
                        {openOption &&
                            (<div className="option1">
                                <div className="option-item">
                                    <span className="item">Adults</span>
                                    <div className="Counter">
                                        <button className="optionCounter" onClick={() =>{decrement("adults")}}>-</button>
                                        <span className="counterNum">{option.adults}</span>
                                        <button className="optionCounter" onClick={() =>{increment("adults")}}>+</button>
                                    </div>
                                </div>
                                <div className="option-item">
                                    <span className="item">Children</span>
                                    <div className="Counter">
                                        <button className="optionCounter" onClick={() =>{decrement("children")}}>-</button>
                                        <span className="counterNum">{option.children}</span>
                                        <button className="optionCounter" onClick={() =>{increment("children")}}>+</button>
                                    </div>
                                </div>
                                <div className="option-item">
                                    <span className="item">Rooms</span>
                                    <div className="Counter">
                                        <button className="optionCounter" onClick={() =>{decrement("rooms")}}>-</button>
                                        <span className="counterNum">{option.rooms}</span>
                                        <button className="optionCounter" onClick={() =>{increment("rooms")}}>+</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="search-item-button">
                        <button  onClick={() => {handleRedirect()}}>Search</button>
                    </div>
                </div>
            </>
            }
            </div>
        </div>
    )
}

export default Header