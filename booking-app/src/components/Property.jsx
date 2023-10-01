import React from 'react'
import './property.css'
import Property_tiles from './Property_tiles'
import { useFetch } from './useFetch'

function Property() {
  const {data, loading, error} = useFetch("http://localhost:8800/api/hotels/type")
  const img = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",

  ]
  return (
    <div className="property">
      {img.map((image, i)=>{
        console.log(image)
        return (
            <Property_tiles imag = {image}
            name = "Aparthotel Stare Miasto" 
            loc = "Madrid" 
            price = "Starting from $120" 
            rate = {8.9} 
            desc = {data[i]?.count}/>
        )
      })}
    </div>
  )
}

export default Property