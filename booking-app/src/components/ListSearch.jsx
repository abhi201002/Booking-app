import React, { useEffect, useState } from 'react'
import './listsearch.css'
import { useLocation } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import { useFetch } from './useFetch';
import { useDataValue } from './Datalayer';
import { format } from 'date-fns';
import ListRes from './ListRes';
import List from './List';

function ListSearch() {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.option);
    // const [data, setData] = useState({});
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const [state, dispatch] = useDataValue()
    const url = `http://localhost:8800/api/hotels?min=${min || 0}&max=${max || 99999}&city=${destination}`
    const {data, loading, error} = useFetch(url)
    // useEffect(() =>{
    //     dispatch({type: "SET_DATA", payload: data})
    //     console.log(state.data)
    // },[data])
    return (
        <>
        <div className="listsearch">
            <h1 className="listTitle">Search</h1>
            <div className="searchItem">
                <label htmlFor="">Destination</label>
                <input type="text"  placeholder= {location.state.destination}/>
            </div>
            <div className="searchItem">
                <label htmlFor="">Check-In Date</label>
                <span onClick={() =>{setOpenDate(!openDate)}}>{`${format(
                    date[0].startDate,
                    "MM/dd/yyyy"
                    )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                    <DateRange
                    onChange={(items) => setDate(items.selection)}
                    // ranges={date}
                    // minDate={new Date()}
                    />
                    )
                }
            </div>
            <div className="searchItem">
                <label htmlFor="">Options</label>
                <div className="searchInput">
                    <div className="searchItemOption">
                        <span>Min Price <small>per night</small></span>
                        <input type="number" onChange={e =>{setMin(e.target.value)}}/>
                    </div>
                    <div className="searchItemOption">
                        <span>Max Price <small>per night</small></span>
                        <input type="number" onChange={e =>{setMax(e.target.value)}}/>
                    </div>
                    <div className="searchItemOption">
                        <span>Adult</span>
                        <input type="number" placeholder= {options?.adults} min={0}/>
                    </div>
                    <div className="searchItemOption">
                        <span>Children</span>
                        <input type="number" placeholder= {options?.children} min={0}/>
                    </div>
                    <div className="searchItemOption">
                        <span>Rooms</span>
                        <input type="number" placeholder= {options?.rooms} min={0}/>
                    </div>
                </div>
            </div>
            <div className="button_trans">
                <button className='search_button'>Search</button>
            </div>
        </div>
        <List item = {data}/>
        {/* <div className="listRes">
            {console.log(data)}
            {data?.map((d)=>(
                <ListRes/>
            ))}
        </div> */}
        </>
    )
}

export default ListSearch