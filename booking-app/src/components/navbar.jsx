import React from 'react'
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useAuthValue } from './AuthLayer'
import Option from './Option'

function Navbar() {
    const navigate = useNavigate()
    const [state, dispatch] = useAuthValue()
    const logout = () => {
        localStorage.removeItem("user")
        dispatch({type: "LOGOUT"})
    }
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg bg-body-tertiary nav justify-content-center pe-0">
                <div className="container-fluid p-0">
                    <Link className="navbar-brand title fw-bolder fs-4" to="/">AG-Booking</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">HI</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fw-bold" aria-current="page" to="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active fw-bold" to="#">Link</Link>
                            </li>
                        </ul>
                        <div className="d-flex " role="search">
                            {!state.user ?
                                (
                                    <>
                                    <button className="btn btn-outline-dark navbar_login" type="submit" onClick={() => {navigate('/login')}}>Login</button>
                                    <button className="btn btn-outline-dark home-btn navbar_login"  type="submit" onClick={() => {navigate('/register')}}>Register</button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="navWelcome">
                                            <h4>Welcome</h4>
                                            {/* <h4>, {state.user.details.name}</h4> */}
                                            <div class="navbar_dropdown">
                                                <button class="btn btn-secondary navbar_dropdown_option dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {state.user.details.name}
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <button class="dropdown-item">Your Profile</button>
                                                    <div class="dropdown-divider"></div>
                                                    <button className="dropdown-item navbar_login" type="submit" onClick={() =>{logout()}}>Login Out</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <button className="btn border border-dark bg-transparent navbar_login" type="submit" onClick={() =>{logout()}}>Login Out</button> */}
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <ul className='options'>
                <li><Option title={"Stays"} /></li>
                <li><Option title={"Flights"} /></li>
                <li><Option title={"Car Rentals"} /></li>
                <li><Option title={"Airport Taxi"} /></li>
            </ul>
        </div>
    )
}

export default Navbar