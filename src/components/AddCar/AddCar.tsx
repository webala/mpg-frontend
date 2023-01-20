import { useState } from "react";
import "./AddCar.scss";
import { useQueryClient, useMutation } from "react-query";

function AddCar() {
	const [make, setMake] = useState<string>("");
	const [series, setSeries] = useState<string>("");
	const [model, setModel] = useState<string>("");
	const [fromYear, setFromYear] = useState<string>("");
	const [toYear, setToYear] = useState<string>("");
	const [bodyType, setBodyType] = useState<string>("");
	const [engine, setEngine] = useState<string>("");

	const addCar = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		
        const data = {
            make,
            series,
            model,
            year: `${fromYear}-${toYear}`,
            body_type: bodyType,
            engine
        }

        const response = await fetch('http://localhost:8000/api/cars/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const jsonData = await response.json()
        console.log('response: ', jsonData)
		// return jsonData
        
	};


	const queryClient = useQueryClient()

	const mutation = useMutation(addCar, {
		onSuccess: () => {
			queryClient.invalidateQueries('cars')
		}
	})

	return (
		<div className="add-car">
			<h1 className="heading">Add car</h1>
			<form onSubmit={addCar}>
				<div className="field">
					<label htmlFor="make">Make</label>
					<input
						type="text"
						onChange={(e) => setMake(e.target.value)}
						value={make}
                        required
					/>
				</div>
				<div className="field">
					<label htmlFor="make">Series</label>
					<input
						type="text"
						onChange={(e) => setSeries(e.target.value)}
						value={series}
					/>
				</div>
				<div className="field">
					<label htmlFor="make">Model</label>
					<input
						type="text"
						onChange={(e) => setModel(e.target.value)}
						value={model}
					/>
				</div>
				<div className="field">
					<label htmlFor="make">Year</label>
					<div className="year">
						<input
							type="text"
							onChange={(e) => setFromYear(e.target.value)}
							value={fromYear}
						/>
						<p> - </p>
						<input
							type="text"
							onChange={(e) => setToYear(e.target.value)}
							value={toYear}
						/>
					</div>
				</div>
				<div className="field">
					<label htmlFor="make">Body type</label>
					<input
						type="text"
						onChange={(e) => setBodyType(e.target.value)}
						value={bodyType}
					/>
				</div>
				<div className="field">
					<label htmlFor="make">Engine</label>
					<input
						type="text"
						onChange={(e) => setEngine(e.target.value)}
						value={engine}
					/>
				</div>

				<div className="submit-btn">
					<button type="submit">Add Car</button>
				</div>
			</form>
		</div>
	);
}

export default AddCar;
