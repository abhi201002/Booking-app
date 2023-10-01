import React from 'react'
import './featured.css'
import Tiles from './Tiles'
import { useFetch } from './useFetch'

function Featured() {
  const {data, loading, error} = useFetch("http://localhost:8800/api/hotels/City?cities=Kolkata,Bhilwara,Jaipur")
  return (

    <div className="featured">
        <Tiles img = "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" name = "Dublin" desc = {data[0]}/>
        <Tiles img = "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=" name = "Reno" desc = {data[1]}/>
        <Tiles img = "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" name = "Austin" desc = {data[2]}/>
    </div>
  )
}

export default Featured