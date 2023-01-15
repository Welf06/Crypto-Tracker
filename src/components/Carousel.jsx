import React, { useState } from "react";

import Card from "./Card";

import "../styles/carousel.css";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";

function Carousel() {
	const sampleData = [
		{
			title: "Take a Quiz!",
			key: "card1",
			content: "Learn and Earn $CKB",
			image: card1,
		},
		{
			title: "Portfolio 🔥",
			content: "Track your trades in one place, not all over the place",
			key: "card2",
			image: card2,
		},
		{
			title: "Portfolio",
			key: "card3",
			content: "Track your trades in one place, not all over the place",
			image: card3,
		},
	];

	if (window.innerWidth < 768) {
		return <Mobile sampleData={sampleData} />;
	} else {
		return <Laptop sampleData={sampleData} />;
	}
}

function Mobile({ sampleData }) {
	const [current, setCurrent] = useState(1);
	return (
		<>
			<div className="carousel-container">
				<div className="carousel">
					<Card
						key={sampleData[current - 1].key}
						title={sampleData[current - 1].title}
						content={sampleData[current - 1].content}
						image={sampleData[current - 1].image}
					/>
				</div>
				<div className="carousel-pagination">
					{Array.from({ length: sampleData.length }, (_, i) => i + 1).map(
						(item) => {
							return (
								<div
									key={item}
									className="carousel-pagination-item"
									style={{
										backgroundColor: item === current ? "#0052FE" : "",
										border: item === current ? "2px solid #0052FE" : "",
									}}
									onClick={() => setCurrent(item)}
								>
									<div className="carousel-pagination-item-circle"></div>
								</div>
							);
						}
					)}
				</div>
			</div>
		</>
	);
}

function Laptop({ sampleData }) {
	const [current, setCurrent] = useState(
		Array.from({ length: sampleData.length }, (_, i) => i)
	);
	return (
		<>
			<div className="carousel-container">
				<div className="carousel">
					<div>
						<img src={leftArrow} alt="left-arrow" 
                     onClick={() => {
                        setCurrent(
                           current.map((item) => {
                              if (item === sampleData.length -1) {
                                 return 0;
                              } else {
                                 return item + 1;
                              }
                           })
                        );
                     }}
                  />
					</div>
					<>
						{current.slice(0, 3).map((item) => {
							return (
								<Card
									key={sampleData[item].key}
									title={sampleData[item].title}
									content={sampleData[item].content}
									image={sampleData[item].image}
								/>
							);
						})}
					</>
					<div>
						<img src={rightArrow} alt="right-arrow" 
                     onClick={() => {
                        setCurrent(
                           current.map((item) => {
                              if (item === 0) {
                                 return sampleData.length - 1;
                              } else {
                                 return item - 1;
                              }
                           })
                        );
                     }}
                  />
					</div>
				</div>
			</div>
		</>
	);
}

export default Carousel;
