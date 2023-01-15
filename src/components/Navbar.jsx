import React from "react";

import "../styles/navbar.css";

import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import hamburger from "../assets/hamburger.svg";

function Navbar() {
   if (window.innerWidth < 768) {
      return (
		<>
			<div className="navbar-container">
         <div className="search-container">
					<img src={hamburger} alt="hamburger" />
				</div>
				<div className="logo-container">
					<img src={logo} alt="logo" />
				</div>
			</div>
		</>
	);
   }
   else{
      return (
		<>
			<div className="navbar-container">
				<div className="logo-container">
					<img src={logo} alt="logo" />
				</div>
				<div className="search-container">
               
					<img src={search} alt="search" />
					<img src={hamburger} alt="hamburger" />
				</div>
			</div>
		</>
	);
   }

}

export default Navbar;
