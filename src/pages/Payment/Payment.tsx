import React, { useState } from "react";
import { useQuery } from "react-query";
import "./Payment.scss";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { Spinner } from "@chakra-ui/react";
import AwaitTransaction from "../../components/AwaitTransaction/AwaitTransaction";
import PesapalPayment from "../../components/PesapalPayment/PesapalPayment";

function Payment() {
	let orderId = 1;
	const [phoneNumber, setPhoneNumber] = useState<string>();
	const [transactionId, setTransactionId] = useState<number>();
	const [iframeUrl, setIframeUrl] = useState<string>(
		"https://cybqa.pesapal.com/pesapaliframe/PesapalIframe3/Index?OrderTrackingId=5d0e12f9-8526-4526-85ef-df0937ea5276"
	);

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

	const addMpesaTransactionMutation = useMutation(
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
				console.log("mpesa success data: ", data);
				setTransactionId(data.transaction_id);
			},
		}
	);

	const addPesapalTransactionMutation = useMutation(
		async (data) => {
			const response = await fetch(
				"http://localhost:8000/api/payment/pesapal",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw Error(response.statusText);
			}

			const jsonRes = await response.json();
			return jsonRes;
		},
		{
			onSuccess: (data) => {
				console.log("pesapal success data: ", data);
				setIframeUrl(data.redirect_url);
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
		addMpesaTransactionMutation.mutate(body);
	};

	const handleCardPayment = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const body = {
			order_id: data?.id,
		};
		addPesapalTransactionMutation.mutate(body);
	};

	if (isLoading) {
		return <p>Loading ...</p>;
	}
	if (isError) {
		return <p>Error {error instanceof Error ? error.message : null}</p>;
	}

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
							<button type="submit">Pay</button>
							{addMpesaTransactionMutation.isLoading ? (
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
					<div>
						<h1 className="heading">Pay via card</h1>
						{addPesapalTransactionMutation.isError ? (
							<div>
								{addPesapalTransactionMutation.error instanceof Error
									? addPesapalTransactionMutation.error.message
									: null}
							</div>
						) : null}
					</div>

					<form onSubmit={handleCardPayment}>
						<div className="submit">
							<button type="submit">Pay</button>
							{addPesapalTransactionMutation.isLoading ? (
								<div className="loader">
									{" "}
									<Spinner color="green.500" /> <p>Initiating transaction</p>
								</div>
							) : null}
						</div>
					</form>
				</div>
				{iframeUrl ? <PesapalPayment iframeUrl={iframeUrl} /> : null}
			</div>
		</div>
	);
}

export default Payment;
