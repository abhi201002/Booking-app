import React from 'react'
import './Tiles.css'

function Tiles(props) {
  return (
    <div className="featuredItem">
        <img src={props.img} alt="" className='tiles-img'/>
        <div className="featureTiles">
            <h1>{props.name}</h1>
            <h2>{props.desc}</h2>
        </div>
    </div>
  )
}

export default Tiles