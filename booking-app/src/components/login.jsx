import React, { useState } from 'react'
import { useAuthValue } from './AuthLayer'
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        name: undefined,
        old_password: undefined,
        new_password: undefined
    })
    const [forgot, setForgot] = useState(false)
    const [state, dispatch] = useAuthValue()
    const handleChange = (e) =>{
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        })
        // console.log(credentials)
    }
    const handlePass = (e) => {
        setForgot(true)
    }
    const handleClick = async (e) =>{
        e.preventDefault()
        try {
            // console.log(credentials)
            const res = await axios.post("http://localhost:8800/api/auth/login", {name: credentials.name, password: credentials.old_password})
            console.log(res.data)
            // console.log("SUCCESS")
            localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({type: "LOGIN_SUCCESS"})
            navigate("/")
        } catch (err) {
            alert("Wrong Password !")
            dispatch({type: "LOGIN_FAILURE", error: err.response?.data})
            console.log(err)
        }
    }
    const handleSubmit = async (e) =>{
        console.log(credentials)
        e.preventDefault()
        try {
            // console.log(credentials)
            const res = await axios.put("http://localhost:8800/api/users/update",credentials)
            alert("Password Reset Successfully")
            setForgot(false)
        } catch (err) {
            alert("Enter Valid Old Password !")
            console.log(err)
        }
    }
    console.log(state.error)
    return (
        <div className="login">
            {!forgot ?
                <div className="lContainer">
                    <input type="text" placeholder = "username" id = "name" onChange = {handleChange} className="lInput" />
                    <input type="password" placeholder = "password" id = "old_password" onChange = {handleChange} className="lInput" />
                    <button className="lbutton" onClick={handleClick}>Login</button>
                    <button className="lbutton" onClick={handlePass}>Forgot Password</button>
                    <button className="lbutton" onClick={() => {navigate('/')}}>Continue As Guest</button>
                    <button className="lbutton" onClick={() => {navigate('/register')}}>Register</button>
                </div>
                :
                <div className="lContainer">
                    <input type="text" placeholder = "username" id = "name" onChange = {handleChange} className="lInput" />
                    <input type="password" placeholder = "Old Password" id = "old_password" onChange = {handleChange} className="lInput" />
                    <input type="password" placeholder = "New Password" id = "new_password" onChange = {handleChange} className="lInput" />
                    <button className="lbutton" onClick={handleSubmit}>Submit</button>
                    <button className="lbutton" onClick={() => {setForgot(false)}}>Log In</button>
                </div>
            }
        </div>
    )
}

export default Login