import React, { useState } from "react";
import "./Process.scss";
import { useMutation } from "react-query";
import { Spinner, useToast } from "@chakra-ui/react";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

function Process({ cart }) {
	const [firstName, setFirstName] = useState<string>();
	const [lastName, setLastName] = useState<string>();
	const [phoneNumber, setPhoneNumber] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [location, setLocation] = useState<string>();
	const [building, setBuilding] = useState<string>();
	const [houseNumber, setHouseNumber] = useState<string>();
	const [description, setDescription] = useState<string>();

	const toast = useToast();
	const navigate = useNavigate();

	const createOrderMutation = useMutation(
		async (data) => {
			const response = await fetch("http://localhost:8000/api/orders/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw Error(response.statusText);
			}

			const jsonRes = await response.json();
			return jsonRes;
		},
		{
			onSuccess: async (data) => {
				console.log("data: ", data);

				toast({
					title: "Success.",
					description: "Order placed. Redirecting to payment",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "bottom-right",
				});
				navigate("/payment", { state: { order_id: data.order_id } });
			},
		}
	);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		let order_items: { part_id: number; quantity: number }[] = [];
		Object.keys(cart).forEach((key) => {
			const order_item = {
				part_id: parseInt(key),
				quantity: cart[key].quantity,
			};
			order_items.push(order_item);
		});
		console.log("cart: ", cart);

		const data = {
			order_items,
			shipping_address: {
				location,
				building,
				house_number: houseNumber,
				description,
				client: {
					first_name: firstName,
					last_name: lastName,
					phone_number: phoneNumber,
					email,
					is_subscribed: false,
				},
			},
		};
		console.log("order data: ", data);
		createOrderMutation.mutate(data);
	};

	return (
		<div className="process">
			{createOrderMutation.isError ? (
				<div>An error occurred: {createOrderMutation.error.message}</div>
			) : null}
			<form onSubmit={handleSubmit}>
				<div className="title">
					<h1>Contact information</h1>
					{createOrderMutation.isLoading ? <Spinner color="red.500" /> : null}
				</div>
				<div className="field">
					<label htmlFor="first-name">First name</label>
					<input
						type="text"
						name="firstName"
						placeholder="John"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor="last-name">Last name</label>
					<input
						type="text"
						placeholder="James"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor="first-name">Your phone number</label>
					<input
						type="text"
						placeholder="+2547830329"
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor="first-name">Your email adress</label>
					<input
						type="text"
						placeholder="email@email.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="title">
					<h1>Shipping address</h1>
				</div>
				<div className="field">
					<label htmlFor="last-name">City/Town/Area</label>
					<input
						type="text"
						placeholder="Nairobi/Kiambu/Eastern bypass"
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor="last-name">Building</label>
					<input
						type="text"
						placeholder="Dynamic shopping center"
						onChange={(e) => setBuilding(e.target.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor="last-name">House number</label>
					<input
						type="text"
						placeholder="803"
						onChange={(e) => setHouseNumber(e.target.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor="last-name">Detailed description</label>
					<input
						type="text"
						placeholder="Opposite naivas"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="submit">
					<button type="submit">Process order</button>
				</div>
			</form>
		</div>
	);
}

export default Process;
