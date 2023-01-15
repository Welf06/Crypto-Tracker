import React from 'react'

import '../styles/carousel.css'

function Card({title, image, content}) {
  return (
    <>
      <div className="card-container">
         <div className="card">
            <div className="card-image">
               <img src={image} alt="card" 
                  style={{height: "100%", width: "100%", objectFit: "cover"}}
               />
            </div>
            <div className="card-content">
            <p>{title}</p>
               <h4>{content}</h4>
            </div>
         </div>
      </div>
    </>
  )
}

export default Card;