import React from 'react'
import './Option.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Option(props) {
  return (
    <div className="option">
        {/* <FontAwesomeIcon icon="fa-solid fa-bed" style={{color: "#000000",}} /> */}
        <button className='btn btn-option m-0'>{props.title}</button>
    </div>
  )
}

export default Option