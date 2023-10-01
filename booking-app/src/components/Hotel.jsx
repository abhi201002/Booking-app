import React, { useEffect, useState } from 'react'
import './hotel.css'
import Navbar from './navbar'
import Header from './Header'
import Mail from './Mail';
import Footer from './Footer';
import { Datalayer, useDataValue } from './Datalayer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from './useFetch';
import { useAuthValue } from './AuthLayer';
import Reserve from './Reserve';
import Review from './Review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faCircleRight, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

function Hotel() {
  const location = useLocation()
  const Data = location.state
  console.log("efe", Data)
  const navigate = useNavigate()
  const path = location.pathname.split("/")[2]
  console.log(location)
  const [state, dispatch] = useDataValue()
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [num, setNum] = useState(0);
  const [data, setData] = useState({});
  const [state1, dispatch1] = useAuthValue()
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  function getDays(day1, day2){
    const time = Math.abs(new Date(day2).getTime() - new Date(day1).getTime())
    const ms = 1000 * 60 * 60 * 24
    const days = Math.ceil(time/ms)

    return days
  }
  let days = null;
  if(state.dates){
    days = getDays(state?.dates[0]?.endDate, state?.dates[0]?.startDate)
  }
  const handleClick = (i) =>{
    setOpen(true)
    setNum(i)
  }
  const change = (i) =>{
    if(i == 'i'){
      if(num < 5){
        setNum(num + 1)
      }
      else{
        setOpen(false)
      }
    }
    else{
      if(num > 0){
        setNum(num - 1)
      }
      else{
        setOpen(false)
      }
    }
  }
  const handleBook = () =>{
    console.log(`User is ${state1.user}`)
    if(state1.user){
      setOpenModal(true)
    }
    else{
      navigate('/login')
    }
  }
  useEffect(() =>{
    const fetch = async() => {
      try {
        const res = await axios.get(`http://localhost:8800/api/hotels/find/${path}`);
        console.log("hiiii", res.data)
        setData(res.data)
      } catch (error) {
        alert("Error")
      }
    } 
    fetch()
  },[])
  console.log(data)
  return (
    <div className="hotel">
      <Navbar/>
      <Header type = "list"/>
      {open && <div className="hotelSlider">
        {/* <div className="sliderWrap"> */}
        <div className="close">
          <FontAwesomeIcon icon={faCircleXmark} size='2xl' style = {{color: "#000"}} onClick={() =>{setOpen(!open)}}/>
        </div>
          <FontAwesomeIcon icon={faCircleLeft} className="prev" size='2xl' style = {{color: "#0071C2"}} onClick={() =>{change('d')}}/>
          <img src={photos[num].src} alt="" />
          <FontAwesomeIcon icon={faCircleRight} className="next" size='2xl' style = {{color: "#0071C2"}} onClick={() =>{change('i')}}/>
        {/* </div> */}
      </div>
      }
      <div className="hotelBox">
        <div className="hotelWrap">
          <div className="button_trans">
            <button className="hotelbutton" onClick={() => {handleBook()}}>Book Now!</button>
          </div>
          <h1 className="hotelTitle">{Data.name}</h1>
          <div className="hotelAdd">
            <span>{Data.address}</span>
          </div>
          <span className="hotelDis">{Data.distance}</span>
          <span className="hotelPrice">{Data.desc}</span>
          <div className="hotelImages">
            {photos.map((img , i) =>(
              <div className="hotelImgWrap">
                <img src={img.src} alt="" className="hotelImg"  onClick={() => handleClick(i)}/>
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelText">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            {days != null ? 
              (<div className="hotelPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${data?.CheapestPrice * days}</b> {days} nights
                </h2>
                <div className="button_trans hotelBook">
                  <button onClick={() => {handleBook()}}>Book Now!</button>
                </div>
              </div>)
              :
              ""
            }
          </div>
        </div>
      </div>
      <hr />
      <hr />
      <Review id = {path} comments = {data?.comments}/>
      <Mail/>
      <Footer/>
      {openModal && <Reserve hotelId = {path} setOpen = {setOpenModal}/>}
    </div>
  )
}

export default Hotel