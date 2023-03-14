/** @format */

import { useState, useEffect } from "react";
import "./SelectCar.scss";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Select, Spinner } from "@chakra-ui/react";
import { Car, GlobalState } from "../../interface";
import { userActions } from "../../store/user-slice";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

type SelectCarProps = {
	cars: Car[];
};

type selectedCar = {
	make?: string;
	model?: string;
	engine?: string;
	year?: string;
	series?: string;
	body_type?: string;
};

type Options = {
	makes: string[];
	models: string[];
	engines: string[];
	years: string[];
	series: string[];
	bodyTypes: string[];
};

function SelectCar({ cars }: SelectCarProps) {
	const isAuth = useSelector((state: GlobalState) => state.user.isAuth);
	const user = useSelector((state: GlobalState) => state.user.user);
	const dispatch = useDispatch();

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

	const [selectedCar, setSelectedCar] = useState<selectedCar>({
		make: "",
		engine: "",
		series: "",
		year: "",
		model: "",
		body_type: "",
	});
	const [selectionComplete, setSelectionComplete] = useState<boolean>(false);
	const [options, setOptions] = useState<Options>({
		makes: [...new Set(cars.map((car) => car.make))],
		models: [],
		engines: [],
		years: [],
		bodyTypes: [],
		series: [],
	});
	// const [deleteCarId, setDeleteCarId] = useState<number>()
	let deleteCarId: number;

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

	const queryClient = useQueryClient();

	const addUserVehicleMutation = useMutation(
		async () => {
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
				car_id: car?.id,
			};
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
			return jsonRes;
		},
		{
			onSuccess: () => {
				console.log("vehicle added successfully");
				queryClient.invalidateQueries(["userVehicles", user.username]);
				setOptions({
					makes: [...new Set(cars.map((car) => car.make))],
					models: [],
					engines: [],
					years: [],
					bodyTypes: [],
					series: [],
				});
			},
		}
	);

	const removeUserVehicleMutation = useMutation(
		async () => {
			console.log("id: ", deleteCarId);
			const data = {
				username: user.username,
				car_id: deleteCarId,
			};

			const response = await axios.post(
				"http://localhost:8000/api/user/vehicles/remove",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			return response.data;
		},
		{
			onSuccess: () => {
				console.log("vehicle removed");
            dispatch(userActions.removeCar({carId: deleteCarId}))
			},
		}
	);

	const handleSetSelectedCar = (data: selectedCar) => {
		if (data.make) {
			setSelectedCar((car) => ({
				...car,
				make: data.make,
				series: "",
				model: "",
				year: "",
				engine: "",
				body_type: "",
			}));

			let availableVehicles = [
				...new Set(cars.filter((car) => car.make === data.make && car.series)),
			];

			if (availableVehicles.length <= 0) {
				availableVehicles = [
					...new Set(cars.filter((car) => car.make === data.make)),
				];
				const availableModels = availableVehicles.map((car) => car.model);
				setOptions((prevOptions: Options) => ({
					...prevOptions,
					series: [],
					models: availableModels,
					years: [],
					engines: [],
					bodyTypes: [],
				}));
			} else {
				const availableSeries = availableVehicles.map(
					(vehicle) => vehicle.series
				);

				setOptions((prevOptions: Options) => ({
					...prevOptions,
					series: availableSeries,
					models: [],
					years: [],
					engines: [],
					bodyTypes: [],
				}));
			}
		} else if (data.series) {
			setSelectedCar((car) => ({
				...car,
				series: data.series,
				model: "",
				year: "",
				engine: "",
				body_type: "",
			}));
			let availableCars = [
				...new Set(
					cars.filter((car) => {
						if (
							car.series === data.series &&
							car.make === selectedCar.make &&
							car.model
						) {
							return car;
						}
					})
				),
			];

			const availableModels = availableCars.map((car) => car.model);
			if (availableModels.length <= 0) {
				availableCars = [
					...new Set(
						cars.filter((car) => {
							if (car.series === data.series && car.make === selectedCar.make) {
								return car;
							}
						})
					),
				];
				const availableYears = availableCars.map((car) => car.year);
				console.log("available years", availableYears);
				setOptions((prevOptions: Options) => ({
					...prevOptions,
					models: [],
					years: availableYears,
					engines: [],
					bodyTypes: [],
				}));
			} else {
				setOptions((prevOptions: Options) => ({
					...prevOptions,
					models: availableModels,
					years: [],
					engines: [],
					bodyTypes: [],
				}));
			}
		} else if (data.hasOwnProperty("model")) {
			setSelectedCar((car) => ({
				...car,
				model: data.model,
				year: "",
				engine: "",
				body_type: "",
			}));
			const availableCars = [
				...new Set(
					cars.filter((car) => {
						if (
							car.model === data.model &&
							car.make === selectedCar.make &&
							car.series === selectedCar.series
						) {
							return car;
						}
					})
				),
			];
			const availableYears = availableCars.map((car) => car.year);
			setOptions((prevOptions: Options) => ({
				...prevOptions,
				years: availableYears,
				engines: [],
				bodyTypes: [],
			}));
		} else if (data.year) {
			setSelectedCar((car) => ({
				...car,
				year: data.year,
				engine: "",
				body_type: "",
			}));
			const availableCars = Array.from(
				new Set(
					cars.filter((car) => {
						if (
							car.year === data.year &&
							car.model === selectedCar.model &&
							car.make === selectedCar.make &&
							car.series === selectedCar.series
						) {
							return car;
						}
					})
				)
			);
			const availableEngines = availableCars.map((car) => car.engine);

			setOptions((prevOptions: Options) => ({
				...prevOptions,
				engines: availableEngines,
				bodyTypes: [],
			}));
		} else if (data.engine) {
			setSelectedCar((car) => ({
				...car,
				engine: data.engine,
				body_type: "",
			}));
			const availableCars = Array.from(
				new Set(
					cars.filter((car) => {
						if (
							car.engine === data.engine &&
							car.year === selectedCar.year &&
							car.model === selectedCar.model &&
							car.make === selectedCar.make &&
							car.series === selectedCar.series
						) {
							return car;
						}
					})
				)
			);

			const availableBodyTypes = availableCars.map((car) => car.body_type);
			setOptions((prevOptions: Options) => ({
				...prevOptions,
				bodyTypes: availableBodyTypes,
			}));
		} else if (data.body_type) {
			setSelectedCar((car) => ({ ...car, body_type: data.body_type }));
		}
	};

	const {
		data: vehicles,
		isLoading,
		isError,
		isSuccess,
	} = useQuery(
		["userVehicles", user.username],
		() => fetchUserVehicles(user.username as string),
		{ refetchOnWindowFocus: false }
	);

	const userVehicles: Car[] = useSelector(
		(state: GlobalState) => state.user.user.cars
	);

	useEffect(() => {
		if (isSuccess) {
			const cars: Car[] = vehicles.map((car: Car) => ({
				...car,
				isSelected: false,
			}));

			cars.forEach((car) => dispatch(userActions.addCar(car)));
		}
	}, [vehicles, isSuccess]);

	useEffect(() => {
		if (
			selectedCar.engine &&
			selectedCar.year &&
			selectedCar.make &&
			selectedCar.body_type
		) {
			setSelectionComplete(true);
		} else {
			setSelectionComplete(false);
		}
	}, [selectionComplete, selectedCar]);

	return (
		<div className="select-car">
			<h1 className="heading">Your vehicles</h1>
			{userVehicles && userVehicles.length > 0 ? (
				<p className="instruction">
					Click on one of your vehicles to see its available parts
				</p>
			) : null}
			{isSuccess && userVehicles ? (
				<div className="your-cars">
					{userVehicles.map((car: Car, index: number) => (
						<div
							className={car.isSelected ? "car selected" : "car"}
							onClick={() => {
								dispatch(userActions.selectCar({ carId: car.id }));
							}}
							key={index}
						>
							<p>{car.make}</p>
							<p>{car.series}</p>
							<p>{car.model}</p>
							<p>{car.year}</p>
							<p>{car.engine}</p>
							<button
								className="delete"
								onClick={() => {
									deleteCarId = car.id;
									removeUserVehicleMutation.mutate();
								}}
							>
								<AiFillDelete />
							</button>
						</div>
					))}
				</div>
			) : null}

			{isLoading && (
				<p className="cars-loading">
					<Spinner color="red.500" />
				</p>
			)}

			{isError && (
				<div className="your-car">You do not have any saved vehicles.</div>
			)}
			<div className="new-car">
				<div className="selected-car">
					<div>
						<h1>Add a new vehicle</h1>
						{addUserVehicleMutation.isLoading ? (
							<div className="mutation-loading">
								<p>Adding vehicle</p>
								<p>
									<Spinner color="red.500" />
								</p>
							</div>
						) : null}
					</div>

					<div>
						<p>{selectedCar.make}</p>
						<p>{selectedCar.series}</p>
						<p>{selectedCar.model}</p>
						<p>{selectedCar.year}</p>
						<p>{selectedCar.engine}</p>
						<p>{selectedCar.body_type}</p>

						{selectionComplete ? (
							<div className="submit">
								<button onClick={() => addUserVehicleMutation.mutate()}>
									Select this car
								</button>
							</div>
						) : null}
					</div>
				</div>
				{options.makes && (
					<div className="spec">
						<h1 className="category-heading">Make</h1>
						<div className="makes choices">
							<Select placeholder="Make">
								{options.makes.map((make, index) => (
									<option
										className={
											selectedCar.make === make ? "choice selected" : "choice"
										}
										onClick={() => handleSetSelectedCar({ make })}
										key={index}
									>
										{make as string}
									</option>
								))}
							</Select>
						</div>
					</div>
				)}
				{options.series.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Series</h1>
						<div className="choices">
							<Select placeholder="Series">
								{options.series.map((series, index) => (
									<option
										className={
											selectedCar.series === series
												? "choice selected"
												: "choice"
										}
										key={index}
										onClick={() => handleSetSelectedCar({ series })}
									>
										{series as string}
									</option>
								))}
							</Select>
						</div>
					</div>
				) : null}

				{options.models.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Model</h1>
						<div className="choices">
							<Select placeholder="Model">
								{options.models.map((model, index) => (
									<option
										className={
											selectedCar.model === model ? "choice selected" : "choice"
										}
										key={index}
										onClick={() => handleSetSelectedCar({ model })}
									>
										{model as string}
									</option>
								))}
							</Select>
						</div>
					</div>
				) : null}
				{options.years.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Year</h1>
						<div className="choices">
							<Select placeholder="Year">
								{options.years.map((year, index) => (
									<option
										className={
											selectedCar.year === year ? "choice selected" : "choice"
										}
										key={index}
										onClick={() => handleSetSelectedCar({ year })}
									>
										{year as string}
									</option>
								))}
							</Select>
						</div>
					</div>
				) : null}
				{options.engines.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Engine</h1>
						<div className="choices">
							<Select placeholder="Engine">
								{options.engines.map((engine, index) => (
									<option
										className={
											selectedCar.engine === engine
												? "choice selected"
												: "choice"
										}
										key={index}
										onClick={() => handleSetSelectedCar({ engine })}
									>
										{engine as string}
									</option>
								))}
							</Select>
						</div>
					</div>
				) : null}
				{options.bodyTypes.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Body type</h1>
						<div className="choices">
							<Select placeholder="Body type">
								{options.bodyTypes.map((bodyType, index) => (
									<option
										className={
											selectedCar.body_type === bodyType
												? "choice selected"
												: "choice"
										}
										key={index}
										onClick={() =>
											handleSetSelectedCar({ body_type: bodyType })
										}
									>
										{bodyType as string}
									</option>
								))}
							</Select>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default SelectCar;
