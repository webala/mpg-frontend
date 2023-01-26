import React from "react";
import "./Process.scss";

function Process() {
	return (
		<div className="process">
			<form>
				<div className="title">
					<h1>Contact information</h1>
				</div>
				<div className="field">
					<label htmlFor="first-name">First name</label>
					<input type="text" placeholder="John" />
				</div>
				<div className="field">
					<label htmlFor="last-name">Last name</label>
					<input type="text" placeholder="James" />
				</div>
				<div className="field">
					<label htmlFor="first-name">Your phone number</label>
					<input type="text" placeholder="+2547830329" />
				</div>
				<div className="field">
					<label htmlFor="first-name">Your email adress</label>
					<input type="text" placeholder="email@email.com" />
				</div>
				<div className="title">
          <h1>Shipping address</h1>
        </div>
        <div className="field">
					<label htmlFor="last-name">City/Town/Area</label>
					<input type="text" placeholder="Nairobi/Kiambu/Eastern bypass" />
				</div>
        <div className="field">
					<label htmlFor="last-name">Building</label>
					<input type="text" placeholder="Dynamic shopping center" />
				</div>
        <div className="field">
					<label htmlFor="last-name">House number</label>
					<input type="text" placeholder="803" />
				</div>
        <div className="field">
					<label htmlFor="last-name">Detailed description</label>
					<input type="text" placeholder="Opposite naivas" />
				</div>
        <div className="submit">
          <button type="submit">Process order</button>
        </div>
			</form>
		</div>
	);
}

export default Process;
