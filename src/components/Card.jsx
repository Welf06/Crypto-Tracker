import React, {useState, useEffect} from 'react'

import '../styles/carousel.css'
import card1 from '../assets/card1.png'

function Card({title, image, content}) {
  return (
    <>
      <div className="card-container">
         <div className="card">
            <div className="card-image">
               <img src={image} alt="card" />
            </div>
            <div className="card-content">
               <h3>{title}</h3>
               <p>{content}</p>
            </div>
         </div>
      </div>
    </>
  )
}

export default Card;