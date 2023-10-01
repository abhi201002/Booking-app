import React from 'react'
import "./mail.css"

function Mail() {
  return (
    <div className="mail">
      <h1 className="mailTitle">
        Lorem ipsum dolor sit amet consectetur.
      </h1>
      <span className="mailDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur provident distinctio pariatur culpa accusantium expedita.
      </span>
      <div className="mailInput">
        <input type="text" placeholder='Your Email'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Mail