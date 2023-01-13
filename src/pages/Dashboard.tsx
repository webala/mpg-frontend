import { useEffect, useState } from "react";
import AddCar from "../components/AddCar/AddCar";
import AddPart from "../components/AddPart/AddPart";

export interface iCar {
	id?: Number;
	make: string;
	series?: string;
	model: string;
	year: string;
	body_type: string;
	engine: string;
}


function Dashboard() {

	const [cars, setCars] = useState<iCar[]>([])

	const fetchCars = async () => {
		try {
			const response = await fetch('http://localhost:8000/api/cars/')

			const jsonRes:iCar[] = await response.json()
			console.log("cars: ", jsonRes);
			
			setCars(jsonRes)
		} catch(error) {
			console.log('error: ', error)
			
		}
	}

	useEffect(() => {
		fetchCars()
	}, [])
	return (
		<div>
			<AddCar />
			<AddPart cars={cars}/>
		</div>
	);
}

export default Dashboard;
