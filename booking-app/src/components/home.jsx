import React from 'react'
import Navbar from './navbar'
import Header from './Header'
import './home.css'
import Featured from './featured'
import Property from './Property'
import Mail from './Mail'
import Footer from './Footer'

function Home() {
  return (
    <div className="home">
        <Navbar/>
        <Header/>
        <div className="home-container">
          <Featured/>
          <h1 className='homeTitle'>Lorem, ipsum dolor.</h1>
          <Property/>
          <Mail/>
          <Footer/>
        </div>
    </div>
  )
}

export default Home