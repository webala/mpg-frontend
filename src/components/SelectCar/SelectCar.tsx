import { useState, useEffect } from "react";
import "./SelectCar.scss";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Select, Spinner } from "@chakra-ui/react";
import { Car, GlobalState } from "../../interface";

type SelectCarProps = {
	cars: Car[];
};

type addVehicleData = {
	username: string;
	car_id: number;
};

type selectedCar = {
	make?: string;
	model?: string;
	engine?: string;
	year?: string;
	series?: string;
	body_type?: string;
};

function SelectCar({ cars }: SelectCarProps) {
	const isAuth = useSelector((state: GlobalState) => state.user.isAuth);
	const user = useSelector((state: GlobalState) => state.user.user);

	const [submitData, setSubmitData] = useState<addVehicleData>();

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
	const [makes, setMakes] = useState(
		Array.from(new Set(cars.map((car) => car.make)))
	);
	const [series, setSeries] = useState<string[]>([]);
	const [models, setModels] = useState<string[]>([]);
	const [years, setYears] = useState<string[]>([]);
	const [engins, setEngins] = useState<string[]>([]);
	const [bodyTypes, setBodyTypes] = useState<string[]>([]);

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
			const response = await fetch(
				"http://localhost:8000/api/user/vehicles/add",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(submitData),
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
				queryClient.invalidateQueries(["userVehicles", user.username]);
			},
		}
	);

	useEffect(() => {
		if (
			selectedCar.model &&
			selectedCar.series &&
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
			car_id: car?.id,
		};
		setSubmitData(data as addVehicleData);
		addUserVehicleMutation.mutate();
	};

	const handleSetSelectedCar = (data: selectedCar) => {
		console.log("data: ", data);
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

			const availableVehicles = [
				...new Set(cars.filter((car) => car.make === data.make)),
			];

			const availableSeries = availableVehicles.map(
				(vehicle) => vehicle.series
			);

			setSeries(availableSeries as string[]);
			setModels([]);
			setYears([]);
			setEngins([]);
			setBodyTypes([]);
		} else if (data.series) {
			setSelectedCar((car) => ({
				...car,
				series: data.series,
				model: "",
				year: "",
				engine: "",
				body_type: "",
			}));
			console.log("selectedCar", selectedCar)
			const availableCars = [
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
			console.log("available models: ", availableModels);

			if (availableModels.length <= 0) {
				
				handleSetSelectedCar({ model: "" });
				console.log('series after recursion: ', selectedCar.series)
			}

			setModels(availableModels as string[]);
			setYears([]);
			setEngins([]);
			setBodyTypes([]);
		} else if (data.hasOwnProperty("model")) {
			console.log("its data model");
			const availableCars = [
				...new Set(
					cars.filter((car) => {
						console.log(
							"model: ",
							car.series,
							selectedCar.series,
							"is equal: ",
							car.series === selectedCar.series
						);
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
			console.log("available years: ", availableCars);

			const availableYears = availableCars.map((car) => car.year);
			setYears(availableYears as string[]);
			setEngins([]);
			setBodyTypes([]);
			setSelectedCar((car) => ({
				...car,
				model: data.model,
				year: "",
				engine: "",
				body_type: "",
			}));
		} else if (data.year) {
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

			const availableEngins = availableCars.map((car) => car.engine);

			setEngins(availableEngins as string[]);
			setBodyTypes([]);
			setSelectedCar((car) => ({
				...car,
				year: data.year,
				engine: "",
				body_type: "",
			}));
		} else if (data.engine) {
			setSelectedCar((car) => ({ ...car, engine: data.engine, body_type: "" }));
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
			setBodyTypes(availableBodyTypes as string[]);
		} else if (data.body_type) {
			setSelectedCar((car) => ({ ...car, body_type: data.body_type }));
		}
	};

	const {
		data: vehicles,
		isLoading,
		isError,
		isSuccess,
	} = useQuery(["userVehicles", user.username], () =>
		fetchUserVehicles(user.username as string)
	);

	if (isLoading) {
		return (
			<div className="select-car">
				<h1 className="heading">Your vehicles</h1>
				<p>
					<Spinner color="red.500" />
				</p>
			</div>
		);
	}
	return (
		<div className="select-car">
			<h1 className="heading">Your vehicles</h1>
			{isSuccess && (
				<div className="your-car">
					{vehicles.map((car: Car) => (
						<div className="car">
							<p>{car.make}</p>
							<p>{car.series}</p>
							<p>{car.model}</p>
							<p>{car.year}</p>
							<p>{car.engine}</p>
						</div>
					))}
				</div>
			)}

			{isError && (
				<div className="your-car">You do not have any saved vehicles.</div>
			)}
			<div className="new-car">
				<div className="selected-car">
					<h1>Select a new vehicle</h1>
					<div>
						<p>{selectedCar.make}</p>
						<p>{selectedCar.series}</p>
						<p>{selectedCar.model}</p>
						<p>{selectedCar.year}</p>
						<p>{selectedCar.engine}</p>
						<p>{selectedCar.body_type}</p>

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
							<Select placeholder="Make">
								{makes.map((make, index) => (
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
				{series.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Series</h1>
						<div className="choices">
							<Select placeholder="Series">
								{series.map((series, index) => (
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

				{models.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Model</h1>
						<div className="choices">
							<Select placeholder="Model">
								{models.map((model, index) => (
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
				{years.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Year</h1>
						<div className="choices">
							<Select placeholder="Year">
								{years.map((year, index) => (
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
				{engins.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Engine</h1>
						<div className="choices">
							<Select placeholder="Engine">
								{engins.map((engine, index) => (
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
				{bodyTypes.length > 0 ? (
					<div className="spec">
						<h1 className="category-heading">Body type</h1>
						<div className="choices">
							<Select placeholder="Body type">
								{bodyTypes.map((bodyType, index) => (
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
