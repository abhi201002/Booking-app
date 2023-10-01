import React from 'react'
import './property_tiles.css'

function Property_tiles(props) {
  return (
    <div className="prop-tiles">
        <img src = {props.imag} alt="" className="prop-img" />
        <div className="prop-titles">
            <h1>{props.name}</h1>
            <h2>{props.desc} Hotels</h2>
        </div>
    </div>
  )
}

export default Property_tiles