import React from 'react'
import './loader.css'

function Loader() {
  return (
    <div className="loader">
        <img className='loader-img' src=".\images\loader.svg" alt="" />
        <div className="loader-desc">
            Hold We are getting best deals for you!
        </div>
    </div>
  )
}

export default Loader