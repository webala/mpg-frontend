import React from "react";
import { useQuery } from "react-query";
import Part from "../Part/Part";
import "./Category.scss"

function Category({ categoryName }) {
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
	console.log("data: ", data);
	return (
		<div className="category">
			{data.map((item, index) => {
				return <Part part={item} key={index} />;
			})}
		</div>
	);
}

export default Category;
