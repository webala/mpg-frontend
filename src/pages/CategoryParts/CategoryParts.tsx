/** @format */

import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { GlobalState, PartShape } from "../../interface";
import Part from "../../components/Part/Part";
import pluralize from "pluralize";
import { useSelector } from "react-redux";
import "./CategoryParts.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useDisclosure } from "@chakra-ui/react";
import Cart from "../../components/Cart/Cart";
import { useState } from "react";
import { getCookie } from "../../cart";
import SelectCar from "../../components/SelectCar/SelectCar";
import Footer from "../../components/Footer/Footer";

export default function CategoryParts() {
	const location = useLocation();
	const categoryName = location.state.categoryName;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [cart, setCart] = useState(JSON.parse(getCookie("cart") as string));

	const isAuth = useSelector((state: GlobalState) => state.user.isAuth);
	const userVehicles = useSelector(
		(state: GlobalState) => state.user.user.cars
	);
	const selectedVehicle = userVehicles.find(
		(vehicle) => vehicle.isSelected === true
	);

	const fetchCategoryParts = async () => {
		let url = `http://localhost:8000/api/parts/${categoryName}`;

		if (selectedVehicle) {
			url = `http://localhost:8000/api/parts/${categoryName}/${selectedVehicle.id}`;
		}
		const response = await fetch(url);

		if (!response.ok) {
			throw Error("Something went wrong");
		}
		const jsonRes = await response.json();
		return jsonRes;
	};

	const {
		data: parts,
		isLoading,
		isError,
		isSuccess,
		error,
	} = useQuery(["parts", categoryName], fetchCategoryParts);

	if (isLoading) {
		return <p>Loading parts ...</p>;
	}

	if (isError) {
		console.log("error: ", error);
		return <p>Something went wron</p>;
	}

	const heading = pluralize(categoryName, 2);
	return (
		<div className="category-parts">
			<Navbar onOpen={onOpen} />
			<div className="title">
				<h1 className="">{heading}</h1>
				{!isAuth ? (
					<p>
						Please <a href="/login">login </a> to your account to select your
						vehicle and get the right parts{" "}
					</p>
				) : null}
				{(isAuth && userVehicles.length <= 0) || !selectedVehicle ? (
					<p>
						Please <a>select your vehicle</a> to get the right parts.
					</p>
				) : null}
				{isAuth && selectedVehicle ? (
					<p className="selected-vehicle">
						{categoryName} parts for {selectedVehicle.make}{" "}
						{selectedVehicle.series} {selectedVehicle.model}{" "}
						{selectedVehicle.year} {selectedVehicle.engine}{" "}
						{selectedVehicle.body_type}
					</p>
				) : null}
			</div>
			{parts.length <= 0 && <div className="parts">
				<p className="no-parts">Sorry, we have no {categoryName} parts for your vehicle.</p>
				</div>}
			<div className="parts">
				{parts.map((part: PartShape, index: number) => (
					<Part part={part} />
				))}
			</div>
			<Cart setCart={setCart} cart={cart} isOpen={isOpen} onClose={onClose} />
			<Footer />
		</div>
	);
}
