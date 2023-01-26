import React, { useState } from "react";
import { useQuery } from "react-query";
import placeholder from "../../assets/placeholder.png";
import {
	MdOutlineAddCircleOutline,
	MdRemoveCircleOutline,
} from "react-icons/md";
import "./CartItem.scss";
import { getCookie, modifyCartCookie } from "../../cart";

function CartItem({setCart, id, quantity }) {
	const [qtity, setQtity] = useState(quantity);
	const fetchPart = async (id: number) => {
		const response = await fetch(`http://localhost:8000/api/part/${id}`);

		if (!response.ok) {
			throw Error("Something went wrong");
		}
		const part = await response.json();
		return part;
	};

	const { data, isLoading, isError, error } = useQuery(["part", id], () =>
		fetchPart(id)
	);

	if (isLoading) {
		return <p>Loading part...</p>;
	}

	if (isError) {
		return <p>Something went wrong</p>;
	}

	const modifyCart = (id: number, action: string) => {
		action === "remove" && qtity > 0
			? setQtity(qtity - 1)
			: setQtity(qtity + 1);
		modifyCartCookie(action, id);
		setCart(JSON.parse(getCookie("cart") as string))
	};

	console.log("data: ", data);

	return (
		<div className="cart-item">
			<div className="item">
				<img src={placeholder} alt="part-img" />
				<h1>{data.name}</h1>
			</div>

			<div className="actions">
				<MdOutlineAddCircleOutline onClick={() => modifyCart(id, "add")} />
				<p>{quantity}</p>
				<MdRemoveCircleOutline onClick={() => modifyCart(id, "remove")} />
			</div>
		</div>
	);
}

export default CartItem;
