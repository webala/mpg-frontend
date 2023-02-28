import React, { useState } from "react";
import "./SelectCar.scss";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";

function SelectCar({ cars }) {
	
	const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.user)
  console.log('user: ', user)

	if (!isAuth) {
		return (
			<div className="select-car ">
				<p>
					Please login to select your vehicle. This will help us find the right
					parts for you.
				</p>
			</div>
		);
	}
	const [selectedCar, setSelectedCar] = useState({
		make: "",
		engine: "",
		series: "",
		year: "",
		model: "",
	});
	const [makes, setMakes] = useState(
		Array.from(new Set(cars.map((car) => car.make)))
	);
	const [series, setSeries] = useState<string[]>([]);
	const [models, setModels] = useState<string[]>([]);
	const [years, setYears] = useState<string[]>([]);
	const [engins, setEngins] = useState<string[]>([]);

	const addUserVehicleMutation = useMutation(async (data) => {
		const response = await fetch("http://localhost:8000/api/user/vehicles/add", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const jsonRes = await response.json()
    console.log('response: ', jsonRes)
    return jsonRes
	}, {
    onSuccess: () => {
      console.log("vehicle added successfullr")
    }
  });

	const handleSubmitCar = () => {
		const car = cars.find(
			(car) =>
				car.make === selectedCar.make &&
				car.model == selectedCar.model &&
				car.engine === selectedCar.engine &&
				car.year === selectedCar.year &&
				car.series === selectedCar.series
		);
    
    const data = {
      username: user.username,
      car_id: car.id
    }
    
		console.log("selected car: ", car);
    addUserVehicleMutation.mutate(data)
	};

	const handleSetSelectedCar = (data) => {
		if (data.make) {
			const availableSeries = Array.from(
				new Set(
					cars.map((car) => {
						if (car.make === data.make) {
							return car.series;
						}
					})
				)
			);

			// if (!availableSeries) {
			// 	const availableModels = Array.from(
			// 		new Set(
			// 			cars.map((car) => {
			// 				if (car.series === data.series && car.make === selectedCar.make) {
			// 					return car.model;
			// 				}
			// 			})
			// 		)
			// 	);

			// 	setModels(availableModels as string[]);
			// }

			setSeries(availableSeries as string[]);
			setSelectedCar((car) => ({ ...car, make: data.make }));
		} else if (data.series) {
			const availableModels = Array.from(
				new Set(
					cars.map((car) => {
						if (car.series === data.series && car.make === selectedCar.make) {
							return car.model;
						}
					})
				)
			);

			// if (!availableModels) {
			// }

			setModels(availableModels as string[]);
			setSelectedCar((car) => ({ ...car, series: data.series }));
		} else if (data.model) {
			const availableYears = Array.from(
				new Set(
					cars.map((car) => {
						if (
							car.model === data.model &&
							car.make === selectedCar.make &&
							car.series === selectedCar.series
						) {
							return car.year;
						}
					})
				)
			);

			setYears(availableYears as string[]);
			setSelectedCar((car) => ({ ...car, model: data.model }));
		} else if (data.year) {
			const availableEngins = Array.from(
				new Set(
					cars.map((car) => {
						if (
							car.year === data.year &&
							car.model === selectedCar.model &&
							car.make === selectedCar.make &&
							car.series === selectedCar.series
						) {
							return car.engine;
						}
					})
				)
			);

			setEngins(availableEngins as string[]);
			setSelectedCar((car) => ({ ...car, year: data.year }));
		} else if (data.engine) {
			setSelectedCar((car) => ({ ...car, engine: data.engine }));
		}
	};
	console.log("makes: ", makes);

	return (
		<div className="select-car">
			<h1 className="heading">Select your vehicle</h1>
			<div className="your-car">
				<div className="car">
					<p>{selectedCar.make}</p>
					<p>{selectedCar.series}</p>
					<p>{selectedCar.model}</p>
					<p>{selectedCar.body_type}</p>
					<p>{selectedCar.year}</p>
					<p>{selectedCar.engine}</p>
				</div>

				<div className="submit">
					<button onClick={handleSubmitCar}>Select this car</button>
				</div>
			</div>
			<div>
				<div className="makes choices">
					{makes.map((make, index) => (
						<p
							className={
								selectedCar.make === make ? "choice selected" : "choice"
							}
							onClick={() => handleSetSelectedCar({ make })}
							key={index}
						>
							{make as string}
						</p>
					))}
				</div>
				{series ? (
					<div className="choices">
						{series.map((series, index) => (
							<p
								className={
									selectedCar.series === series ? "choice selected" : "choice"
								}
								key={index}
								onClick={() => handleSetSelectedCar({ series })}
							>
								{series as string}
							</p>
						))}
					</div>
				) : null}

				{models ? (
					<div className="choices">
						{models.map((model, index) => (
							<p
								className={
									selectedCar.model === model ? "choice selected" : "choice"
								}
								key={index}
								onClick={() => handleSetSelectedCar({ model })}
							>
								{model as string}
							</p>
						))}
					</div>
				) : null}
				{years ? (
					<div className="choices">
						{years.map((year, index) => (
							<p
								className={
									selectedCar.year === year ? "choice selected" : "choice"
								}
								key={index}
								onClick={() => handleSetSelectedCar({ year })}
							>
								{year as string}
							</p>
						))}
					</div>
				) : null}
				{engins ? (
					<div className="choices">
						{engins.map((engine, index) => (
							<p
								className={
									selectedCar.engine === engine ? "choice selected" : "choice"
								}
								key={index}
								onClick={() => handleSetSelectedCar({ engine })}
							>
								{engine as string}
							</p>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default SelectCar;
