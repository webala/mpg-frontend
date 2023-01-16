import { useEffect, useState } from "react";
import "./Dashboard.scss"
import AddCar from "../../components/AddCar/AddCar";
import AddPart from "../../components/AddPart/AddPart";
import Cars from "../../components/Cars/Cars";
import Overview from "../../components/Overview/Overview";
import Parts from "../../components/Parts/Parts";

export interface iCar {
	id?: number;
	make: string;
	series?: string;
	model: string;
	year: string;
	body_type: string;
	engine: string;
}

function Dashboard() {
	const [cars, setCars] = useState<iCar[]>([]);
	const [parts, setParts] = useState([])

	

	const fetchParts = async () => {
		try {
			const response = await fetch("http://localhost:8000/api/parts/");

			const jsonRes = await response.json();
			console.log("parts: ", jsonRes);

			setParts(jsonRes);
		} catch (error) {
			console.log("error: ", error);
		}
	};

	useEffect(() => {
		// fetchCars();
		// fetchParts();
	}, [setCars, setParts]);
	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			<Overview cars={cars.length} parts={parts.length}/>
			<div className="cars">
				<AddCar />
				<Cars  />
			</div>
			<div className="parts">
				<AddPart cars={cars} />
				{/* <Parts parts={parts}/> */}
			</div>
		</div>
	);
}

export default Dashboard;
