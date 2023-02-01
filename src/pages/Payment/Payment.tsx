import React, { useState } from "react";
import { useQuery } from "react-query";
import "./Payment.scss";
import localforage from "localforage";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { Spinner } from "@chakra-ui/react";
import AwaitTransaction from "../../components/AwaitTransaction/AwaitTransaction";

function Payment() {
	let orderId = 1;
	const [phoneNumber, setPhoneNumber] = useState<string>();
	const [transactionId, setTransactionId] = useState<number>();

	// const { state } = useLocation();
	// orderId = state.order_id;

	const fetchOrder = async (id: number) => {
		const response = await fetch(`http://localhost:8000/api/order/${id}`);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const order = await response.json();
		return order;
	};

	const addOrderMutation = useMutation(
		async (data) => {
			const response = await fetch("http://localhost:8000/api/payment/mpesa", {
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
			onSuccess: (data) => {
				console.log("success data: ", data);
				setTransactionId(data.transaction_id);
			},
		}
	);

	const { data, isLoading, isError, error, isSuccess } = useQuery(
		["order", orderId],
		() => fetchOrder(orderId)
	);

	const handleMpesaPayment = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const body = {
			phone_number: "254791055897",
			order_id: data?.id,
		};
		addOrderMutation.mutate(body);
	};

	const handleCardPayment = async () => {};

	if (isLoading) {
		return <p>Loading ...</p>;
	}
	if (isError) {
		return <p>Error {error.message}</p>;
	}
	// if (isSuccess) {
	// 	// setPhoneNumber(data.shipping_address.client.phone_number)
	// }
	console.log("data: ", data);
	return (
		<div className="payment">
			<div className="container">
				<div className="summary">
					<h1 className="heading">Payment for order #{data.id}</h1>
					<p>Order date: {data.date_created}</p>

					<h2 className="sub-heading">Your details</h2>
					<p>
						Name: {data.shipping_address.client.first_name}{" "}
						{data.shipping_address.client.last_name}
					</p>
					<p>Email: {data.shipping_address.client.email}</p>
					<p>
						Shipping address: {data.shipping_address.building}{" "}
						{data.shipping_address.location}, room{" "}
						{data.shipping_address.house_number},{" "}
						{data.shipping_address.description}
					</p>
				</div>

				<div className="payment-method">
					<h1 className="heading">Pay via Mpesa</h1>
					<p className="helper-text">
						Please confirm your phone number below to proceed
					</p>
					<form onSubmit={handleMpesaPayment}>
						<div className="field">
							<input
								type="text"
								value={data.shipping_address.client.phone_number}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
						<div className="submit">
							<button>Pay</button>
							{addOrderMutation.isLoading ? (
								<div className="loader">
									{" "}
									<Spinner color="green.500" /> <p>Initiating transaction</p>
								</div>
							) : null}
						</div>
					</form>
				</div>
				{transactionId ? (
					<AwaitTransaction transactionId={transactionId} />
				) : null}
				<div className="payment-method">
					<h1 className="heading">Pay via card</h1>
					<form onSubmit={handleCardPayment}>
						<div className="field">
							{/* <input
							type="text"
							value={data.shipping_address.client.phone_number}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/> */}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Payment;
