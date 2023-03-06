import React from "react";
import placeholder from "../../assets/placeholder.png";
import "./Part.scss";
import { FaCartArrowDown } from "react-icons/fa";
import { getCookie, modifyCartCookie } from "../../cart";

function Part({ part, setCart }) {
	const addTOCart = () => {
		modifyCartCookie("add", part.id);
		setCart(JSON.parse(getCookie("cart") as string));
	};

	console.log('part: ', part)
	return (
		<div className="part">
			<img src={part.image_url ? part.image_url: placeholder} alt="temp-placeholder" />
			<div>
				<p>{part.name}</p>
				<p>{part.description}</p>
				<div className="add-to-cart">
					<button  onClick={addTOCart}>
						<FaCartArrowDown />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Part;
