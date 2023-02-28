import React, { useState, useEffect } from "react";
import "./SelectCar.scss";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";

function SelectCar({ cars }) {
	const isAuth = useSelector((state) => state.user.isAuth);
	const user = useSelector((state) => state.user.user);
	console.log("user: ", user);

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
	const [selectionComplete, setSelectionComplete] = useState<boolean>(false);
	const [makes, setMakes] = useState(
		Array.from(new Set(cars.map((car) => car.make)))
	);
	const [series, setSeries] = useState<string[]>([]);
	const [models, setModels] = useState<string[]>([]);
	const [years, setYears] = useState<string[]>([]);
	const [engins, setEngins] = useState<string[]>([]);

	const fetchUserVehicles = async (username: string) => {
		const response = await fetch(
			`http://localhost:8000/api/user/vehicles/${username}`
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const jsonRes = await response.json();
		return jsonRes;
	};

	const addUserVehicleMutation = useMutation(
		async (data) => {
			const response = await fetch(
				"http://localhost:8000/api/user/vehicles/add",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const jsonRes = await response.json();
			console.log("response: ", jsonRes);
			return jsonRes;
		},
		{
			onSuccess: () => {
				console.log("vehicle added successfully");
			},
		}
	);

	useEffect(() => {
		if (
			selectedCar.model &&
			selectedCar.series &&
			selectedCar.engine &&
			selectedCar.year &&
			selectedCar.make
		) {
			setSelectionComplete(true);
		} else {
			setSelectionComplete(false);
		}
	}, [selectionComplete, selectedCar]);

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
			car_id: car.id,
		};

		console.log("selected car: ", car);
		addUserVehicleMutation.mutate(data);
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
			setModels([]);
			setYears([]);
			setEngins([]);
			setSelectedCar((car) => ({
				...car,
				make: data.make,
				series: "",
				model: "",
				year: "",
				engine: "",
			}));
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
			setYears([]);
			setEngins([]);
			setSelectedCar((car) => ({
				...car,
				series: data.series,
				model: "",
				year: "",
				engine: "",
			}));
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
			setEngins([]);
			setSelectedCar((car) => ({
				...car,
				model: data.model,
				year: "",
				engine: "",
			}));
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
			setSelectedCar((car) => ({ ...car, year: data.year, engine: "" }));
		} else if (data.engine) {
			setSelectedCar((car) => ({ ...car, engine: data.engine }));
		}
	};
	const { data, isLoading, isError, error, isSuccess } = useQuery(
		["userVEhicles", user.username],
		() => fetchUserVehicles(user.username)
	);

	return (
		<div className="select-car">
			<h1 className="heading">Your vehicles</h1>
			<div className="your-car">
				{data.map((car) => (
					<div className="car">
						<p>{car.make}</p>
						<p>{car.series}</p>
						<p>{car.model}</p>
						<p>{car.year}</p>
						<p>{car.engine}</p>
					</div>
				))}
			</div>
			<div className="new-car">
				<div className="selected-car">
					<h1>Select a new vehicle</h1>

					<div>
						<p>{selectedCar.make}</p>
						<p>{selectedCar.series}</p>
						<p>{selectedCar.model}</p>
						<p>{selectedCar.year}</p>
						<p>{selectedCar.engine}</p>

						{selectionComplete ? (
							<div className="submit">
								<button onClick={handleSubmitCar}>Select this car</button>
							</div>
						) : null}
					</div>
				</div>
				{makes && (
					<div className="spec">
						<h1 className="category-heading">Make</h1>
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
					</div>
				)}
				{series.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Series</h1>
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
					</div>
				) : null}

				{models.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Model</h1>
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
					</div>
				) : null}
				{years.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Year</h1>
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
					</div>
				) : null}
				{engins.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Engine</h1>
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
					</div>
				) : null}
			</div>
		</div>
	);
}

export default SelectCar;
