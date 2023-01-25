import React from "react";
import "./Navbar.scss";
import logo from "../../assets/logo.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Navbar({onOpen}) {
	return (
		<div className="navbar">
			<div className="logo">
				<img src={logo} alt="logo" />
                <h1>MPG Auto Store</h1>
			</div>
			<div className="nav-buttons">
				<AiOutlineShoppingCart className="cart-icon" onClick={onOpen}/>
			</div>
		</div>
	);
}

export default Navbar;
