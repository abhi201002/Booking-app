import React, { useState } from 'react'
import { useAuthValue } from './AuthLayer'
// import "./register.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        name: undefined,
        email: undefined,
        password: undefined
    })
    const [state, dispatch] = useAuthValue()
    const handleChange = (e) =>{
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        })
        // console.log(credentials)
    }
    const handleClick = async (e) =>{
        e.preventDefault()
        try {
            // console.log(credentials)
            const res = await axios.post("http://localhost:8800/api/auth/register", credentials)
            // console.log(res.data.details)
            console.log("SUCCESS")
            alert("Registered Successfully")
            navigate("/login")
            // localStorage.setItem('user', JSON.stringify(res.data.details))
            // dispatch({type: "LOGIN_SUCCESS"})
            // navigate("/")
        } catch (err) {
            // dispatch({type: "LOGIN_FAILURE", error: err.response?.data})
            console.log(err)
        }
    }
    console.log(state.error)
    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder = "username" id = "name" onChange = {handleChange} className="lInput" />
                <input type="password" placeholder = "password" id = "password" onChange = {handleChange} className="lInput" />
                <input type="email" placeholder = "email" id = "email" onChange = {handleChange} className="lInput" />
                <button className="lbutton" onClick={handleClick}>Sign Up</button>
            </div>
        </div>
    )
}

export default Register