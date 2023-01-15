import React from 'react'

import Card from './Card'

import '../styles/carousel.css'
import card1 from '../assets/card1.png'
import card2 from '../assets/card2.png'
import card3 from '../assets/card3.png'

function Carousel() {
   const sampleData = [
      {
         title: "Take a Quiz!",
         content: "Learn and Earn $CKB",
         image: card1
      },
      {
         title: "Portfolio 🔥",
         content: "Track your trades in one place, not all over the place",
         image: card2
      },
      {
         title: "Portfolio",
         content: "Track your trades in one place, not all over the place",
         image: card3
      },
   ]
  return (
    <>
      <div className="carousel-container">
         <div className="carousel">
         {sampleData.map((data) => { 
            return (
            <Card key={'card'} title={data.title} content={data.content} image={data.image}/>
         );
         })
         }
         </div>
         </div>
    </>
  )
}

export default Carousel