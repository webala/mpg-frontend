import React, { useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/logo.jpg";
import { AiOutlineShoppingCart, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsSearch, BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { Select } from "@chakra-ui/react";

function Navbar({ onOpen }) {

	
	const [isActive, setIsActive] = useState<boolean>(false);



	return (
		<div className="navbar">
			<div className="top">
				<div className="logo">
					<img src={logo} alt="logo" />
				</div>
				<div className="links">
					<a href="#">Sign in</a>
					<a href="#">
						<BsSearch />
					</a>
					<p>
						<AiOutlineShoppingCart onClick={onOpen} />
					</p>
				</div>
			</div>
			<div className="bottom">
				<div className="categories">
					<Select placeholder="Categories">
						<option value="Brakes">Brakes</option>
						<option value="Windows">Windows</option>
						<option value="Doors">Doors</option>
						<option value="Suspension">Suspension</option>
						<option value="Turbo pack">Turbo pack</option>
					</Select>
				</div>
				<div className="nav">
					<div className={isActive ? "nav-items active" : "nav-items"}>
						<AiOutlineMenuUnfold className="close-nav" onClick={() => setIsActive(false)}/>
						<a href="#">About MPG</a>
						<a href="#">Contact</a>
					</div>
					<AiOutlineMenuFold className="open-nav" onClick={() => setIsActive(true)}/>
					<div className="socials">
						<a href="#">
							<BsTwitter />
						</a>
						<a href="#">
							<BsInstagram />
						</a>
						<a href="#">
							<BsFacebook />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
