/** @format */

import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { getCookie } from "../../cart";
import Cart from "../../components/Cart/Cart";
import Parts from "../../components/Parts/Parts";
import Hero from "../../components/Hero/Hero";
import AdminActions from "../../components/AdminActions/AdminActions";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { carsActions } from "../../store/cars-slice";
import SelectCar from "../../components/SelectCar/SelectCar";
import { GlobalState } from "../../interface";
import Footer from "../../components/Footer/Footer";

function Home() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [cart, setCart] = useState(JSON.parse(getCookie("cart") as string));

	const isAuth = useSelector((state: GlobalState) => state.user.isAuth);
	const user = useSelector((state: GlobalState) => state.user.user);

	const groups = user.groups;
	let isRetailer = -1;
	if (groups) {
		isRetailer = groups.indexOf("retailer");
	}

	const dispatch = useDispatch();

	const fetchCars = async () => {
		const response = await fetch("http://localhost:8000/api/cars/");
		if (!response.ok) {
			throw new Error("something went wrong");
		}

		const jsonRes = await response.json();
		return jsonRes;
	};

	const { data: cars, isSuccess, isLoading } = useQuery("cars", fetchCars);

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	dispatch(carsActions.serCars(cars));
	console.log("cars: ", cars);
	return (
		<div>
			<Hero onOpen={onOpen} />
			{/* {isAuth && isRetailer >= 0 ? <AdminActions /> : null} */}
			<SelectCar cars={cars} />
			<Parts setCart={setCart} />
			<Cart setCart={setCart} cart={cart} isOpen={isOpen} onClose={onClose} />
			<Footer />
		</div>
	);
}

export default Home;
