import { useEffect, useState } from "react";
import "./Dashboard.scss";
import AddCar from "../../components/AddCar/AddCar";
import AddPart from "../../components/AddPart/AddPart";
import Cars from "../../components/Cars/CarsTable";
import Overview from "../../components/Overview/Overview";
import Parts from "../../components/Parts/PartsTable";

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
	const [parts, setParts] = useState([]);

	return (
		<div className="dashboard">
			
			<Overview cars={cars.length} parts={parts.length} />
			<div className="forms">
				<AddCar />
				<AddPart cars={cars} />
			</div>
			<div className="tables">
				<Cars setCars={setCars} />
				<Parts setParts={setParts}/>
			</div>
		</div>
	);
}

export default Dashboard;
