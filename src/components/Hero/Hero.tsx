import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Hero.scss";

type HeroProps = {
	onOpen: () => void;
};

function Hero({ onOpen }: HeroProps) {
	return (
		<div className="hero">
			<Navbar onOpen={onOpen} />
			<div className="container">
				<div className="motto">
					<h1>Driven by Excellence</h1>
					<p>Your one stop shop for vehicle parts</p>
				</div>
			</div>
		</div>
	);
}

export default Hero;
