import React from 'react'
import "./images.css"

function Images() {
  return (
    <div className="images">
        <div id="carouselExampleControls" className="carousel slide images-box" data-bs-ride="carousel">
            <div className="carousel-inner image-size">
                <div className="carousel-item active">
                <img className="d-block " src="https://img.freepik.com/free-vector/hotel-horizontal-banner-template-with-photo_23-2149006882.jpg?size=626&ext=jpg&uid=R118755602&ga=GA1.1.1401476539.1696097715&semt=ais" alt="First slide"/>
                </div>
                <div className="carousel-item">
                <img className="d-block " src="https://img.freepik.com/free-vector/organic-flat-hotel-banner-with-photo_52683-62489.jpg?w=1380&t=st=1696103141~exp=1696103741~hmac=c5cf0f1e22b1e5c701ba7a020294af56239e0907075244e5202b68d6576006ec" alt="Third slide"/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide-to="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide-to="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    </div>
  )
}

export default Images