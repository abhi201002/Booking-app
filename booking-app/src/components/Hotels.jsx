import React from 'react'
import './hotels.css'
import Navbar from './navbar'
import Header from './Header'
import ListSearch from './ListSearch'
import List from './List'
import { useDataValue } from './Datalayer'

function Hotels() {
  const [state, dispatch] = useDataValue()
  return (
    <div className="Hotels">
        <Navbar/>
        <Header type = "list"/>
        <div className="list">
          <div className="listWrap">
            {console.log(state.dates)}
            <ListSearch/>
          </div>
        </div>
    </div>
  )
}
export default Hotels