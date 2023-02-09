/** @format */

import React from "react";
import CustomTable from "../Table/Table";
import { useQuery } from "react-query";
import { BsFillImageFill } from "react-icons/bs";

function Parts({ setParts }) {
	const fetchParts = async () => {
		const response = await fetch("http://localhost:8000/api/parts/");

		if (!response.ok) {
			throw Error("Something went wrong");
		}
		const jsonRes = await response.json();
		return jsonRes;
	};

	const { data, isError, error, isLoading, isSuccess } = useQuery(
		"parts",
		fetchParts
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError && error) {
		console.log(error);
		return <div>Error</div>;
	}
	const tableColumns = ["Part No.", "Cars"];

	if (isSuccess) {
		setParts(data);
		const tableRows = data.map((part) => ({
			part_no: part.part_no,
			cars: part.cars.length,
		}));
		return (
			<div>
				<CustomTable
					totalRegisters={data.length}
					tableColumns={tableColumns}
					tableData={tableRows}
					title="Parts"
				/>
			</div>
		);
	}

	return <p>Cars</p>;
}

export default Parts;
