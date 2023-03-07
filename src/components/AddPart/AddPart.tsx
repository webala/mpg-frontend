import React, { useState } from "react";
import "./AddPart.scss";
import "../AddCar/AddCar.scss";
import { BsSearch } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Car, GlobalState } from "../../interface";

function AddPart() {
	const [partNo, setPartNo] = useState<string>();
	const [selectedCars, setSelectedCars] = useState<Car[]>([]);
	const [category, setCategory] = useState<string>();
	const [inventory, setInventory] = useState<number>();
	const [price, setPrice] = useState<number>();
	const [description, setDescription] = useState<string>();
	const [brand, setBrand] = useState<string>();
	const [searchResults, setSearchResults] = useState<Car[]>([]);
	const [name, setName] = useState<string>();
	const [partImg, setPartImg] = useState<File>();
	const [step, setStep] = useState<number>(1);
	const [partId, setPartId] = useState<number>(6);

	const toast = useToast();
	const queryClent = useQueryClient();
	const cars = useSelector((state:GlobalState) => state.cars.cars);

	const addPartMutation = useMutation(
		async (data) => {
			const response = await fetch("http://localhost:8000/api/parts/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw Error(response.status.toString());
			}

			const jsonRes = await response.json();
			return jsonRes;
		},
		{
			onSuccess: (data) => {
				console.log("data: ", data);

				queryClent.invalidateQueries("parts");
				setPartId(data.id);
				setStep(2);
			},
			onError: () => {
				toast({
					title: "Error.",
					description: "Failed add part",
					status: "error",
					duration: 9000,
					isClosable: true,
					position: "bottom-right",
				});
			},
		}
	);

	const uploadImageMutation = useMutation(
		async (data) => {
			axios
				.post("http://localhost:8000/api/part/imageupload", data, {
					headers: { "content-type": "multipart/form-data" },
				})
				.then((res) => console.log("response: ", res.data))
				.catch((err) => console.log("err: ", err));
		},
		{
			onSuccess: () => {
				toast({
					title: "Success.",
					description: "New part added.",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "bottom-right",
				});
				queryClent.invalidateQueries("parts");
			},
			onError: () => {
				toast({
					title: "Error.",
					description: "Failed to upload image",
					status: "error",
					duration: 9000,
					isClosable: true,
					position: "bottom-right",
				});
			},
		}
	);

	const searchCar = (value: string): void => {
		const length = value.length;
		const results = cars.filter(
			(car) =>
				car.make.slice(0, length).toLocaleLowerCase() ===
				value.toLocaleLowerCase()
		);
		setSearchResults(results);
	};

	const addPart = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const data = {
			part_no: partNo,
			cars: selectedCars,
			category: category,
			name,
			inventory,
			price,
			description,
			brand,
		};

		addPartMutation.mutate(data);
	};

	const handleImageUpload = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		let data = new FormData();
		console.log(typeof partImg);
		data.append("image", partImg, partImg?.name);
		data.append("part_id", partId.toString());
		console.log("form data: ", data);
		uploadImageMutation.mutate(data);
	};

	return (
		<div className="add-part">
			{step === 1 && (
				<form onSubmit={addPart}>
					<div className="field">
						<label htmlFor="make">Part name</label>
						<input
							type="text"
							onChange={(e) => setName(e.target.value)}
							value={name}
							required
						/>
					</div>
					<div className="field">
						<label htmlFor="make">Part number</label>
						<input
							type="text"
							onChange={(e) => setPartNo(e.target.value)}
							value={partNo}
							required
						/>
					</div>
					<div className="field">
						<label htmlFor="make">Inventory</label>
						<input
							type="number"
							onChange={(e) => setInventory(parseInt(e.target.value))}
							required
						/>
					</div>
					<div className="field">
						<label htmlFor="make">Price</label>
						<input
							type="number"
							onChange={(e) => setPrice(parseInt(e.target.value))}
							required
						/>
					</div>
					<div className="field">
						<label htmlFor="make">Description</label>
						<input
							type="text"
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>
					<div className="field">
						<label htmlFor="make">Brand</label>
						<input
							type="text"
							onChange={(e) => setBrand(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className="title" htmlFor="make">Select a category</label>
						<div className="categories">
							<div className="category">
								<label htmlFor="brakes">Brakes</label>
								<input
									type="radio"
									onChange={(e) => setCategory(e.target.value)}
									value={`BRAKES`}
									name="category"
									required
								/>
							</div>
							<div className="category">
								<label htmlFor="brakes">Window</label>
								<input
									type="radio"
									onChange={(e) => setCategory(e.target.value)}
									value={`WINDOW`}
									name="category"
								/>
							</div>
							<div className="category">
								<label htmlFor="brakes">Gearbox</label>
								<input
									type="radio"
									onChange={(e) => setCategory(e.target.value)}
									value={`GEARBOX`}
									name="category"
								/>
							</div>
							<div className="category">
								<label htmlFor="brakes">Door</label>
								<input
									type="radio"
									onChange={(e) => setCategory(e.target.value)}
									value={`DOOR`}
									name="category"
								/>
							</div>
							<div className="category">
								<label htmlFor="brakes">Other</label>
								<input
									type="radio"
									onChange={(e) => setCategory(e.target.value)}
									value={`OTHER`}
									name="category"
								/>
							</div>
						</div>
					</div>

					<div className="compartible-cars">
						<h2>Select compartible cars.</h2>

						<div className="search">
							<input
								onChange={(e) => searchCar(e.target.value)}
								type="text"
								placeholder="Car make"
							/>
							<BsSearch />
						</div>
						<div className="cars">
							{searchResults.map((result: Car, index: number) => {
								return (
									<div className="field" key={index}>
										<div className="label">
											<p>
												{result.make} {result.model} {result.series}
											</p>
											<p>
												{result.year} {result.engine}
											</p>
										</div>
										<input
											type="checkbox"
											onClick={(e) => {
												console.log("checked: ", e.currentTarget.checked);
												if (e.currentTarget.checked) {
													setSelectedCars([...selectedCars, result]);
												} else {
													setSelectedCars(
														selectedCars.filter((car) => car.id !== result.id)
													);
												}
											}}
										/>
									</div>
								);
							})}
						</div>
					</div>
					<div className="submit-btn">
						<button type="submit">Next</button>
					</div>
				</form>
			)}
			{step === 2 && (
				<form onSubmit={handleImageUpload} encType="multipart/form-data">
					<div className="field">
						<label htmlFor="brakes">Select part image</label>
						<input
							className="image-input"
							type="file"
							accept="image/jpeg,image/jpg,image/png,image/gif"
							onChange={(e) => {
								console.log("files: ", e.target.files);
								setPartImg(e.target.files[0]);
							}}
							required
						/>
					</div>
					<div className="submit-btn">
						<button type="submit">Upload picture</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default AddPart;
