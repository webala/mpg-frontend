import React from "react";
import { useQuery } from "react-query";
import Part from "../Part/Part";
import "./Category.scss";
import placeholder from "../../assets/tyres.jpg";
import {AiOutlineArrowRight} from 'react-icons/ai'

function Category({ setCart, categoryName }) {
	const fetchCategoryParts = async () => {
		const response = await fetch(
			`http://localhost:8000/api/parts/${categoryName}`
		);

		if (!response.ok) {
			throw Error("Something went wrong");
		}
		const jsonRes = await response.json();
		return jsonRes;
	};

	const { data, isLoading, isError, isSuccess, error } = useQuery(
		["parts", categoryName],
		fetchCategoryParts
	);

	if (isLoading) {
		return <p>Loading parts ...</p>;
	}

	if (isError) {
		console.log("error: ", error);
		return <p>Something went wron</p>;
	}

	return (
		<div className="category">
			<div className="heading">
				<img src={placeholder} alt={categoryName} />
				<div className="text">
					<h1>{categoryName}</h1>
					<a href="#">
						<p>View all</p>
						<AiOutlineArrowRight />
					</a>
				</div>
			</div>
			<div className="parts">
				{data.map((item, index) => {
					return <Part setCart={setCart} part={item} key={index} />;
				})}
			</div>
		</div>
	);
}

export default Category;
