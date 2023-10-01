import React, { useEffect, useState } from 'react'
import './list.css'
import ListRes from './ListRes.jsx'
import { useDataValue } from './Datalayer'

function List(props) {
  const [state, dispatch] = useDataValue()
  // const [data, setData] = useState()
  // useEffect(() =>{
  //   setData(state.data)
  // },[state.data])
  return (
    <div className="listRes">
      {console.log(props.item)}
      {props.item?.map((d)=>(
        <ListRes data = {d}/>
      ))}
      {/* <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/> */}
      {/* <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/>
      <ListRes/> */}
    </div>
  )
}

export default List