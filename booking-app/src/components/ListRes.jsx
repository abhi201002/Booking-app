import React from 'react'
import './listres.css'
import { useNavigate } from 'react-router-dom'
import { useFetch } from './useFetch'

function ListRes({data}) {
    // const data = useFetch()
    const navigate = useNavigate()
  return (
    <div className="listres">
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1" alt="" className="listimg" />
        <div className="listdesc">
            <h1 className="listtitle">{data.name}</h1>
            <span className="listDistance">{data.distance}m from center</span>
            <span className="listTaxiOp">{data.address}</span>
            <span className="listSubtitle">
            {data.type}
            </span>
            <span className="listFeatures">
            {data.desc}
            </span>
            <span className="listCancelOp">Free cancellation </span>
            <span className="listCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
            </span>
        </div>
        <div className="listdetails">
            <div className="listRating">
                <span>Excellent</span>
                <button>8.9</button>
            </div>
            <div className="listDetailTexts">
                <span className="listPrice">${data.CheapestPrice}</span>
                <span className="listTaxOp">Includes taxes and fees</span>
                <button className="listCheckButton" onClick={() => (navigate(`/hotels/${data._id}`, {state: data}))}>See availability</button>
            </div>
        </div>
    </div>
  )
}

export default ListRes