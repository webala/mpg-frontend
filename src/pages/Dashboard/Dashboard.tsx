import { useEffect, useState } from "react";
import "./Dashboard.scss";
import AddCar from "../../components/AddCar/AddCar";
import AddPart from "../../components/AddPart/AddPart";
import Cars from "../../components/Cars/CarsTable";
import Overview from "../../components/Overview/Overview";
import Parts from "../../components/Parts/PartsTable";
import { Car, PartShape } from "../../interface";


function Dashboard() {
	const [cars, setCars] = useState<Car[]>([]);
	const [parts, setParts] = useState<PartShape[]>([]);

	return (
		<div className="dashboard">
			
			<Overview cars={cars.length} parts={parts.length} />
			<div className="forms">
				<AddCar />
				<AddPart />
			</div>
			<div className="tables">
				<Cars setCars={setCars} />
				<Parts setParts={setParts}/>
			</div>
		</div>
	);
}

export default Dashboard;
