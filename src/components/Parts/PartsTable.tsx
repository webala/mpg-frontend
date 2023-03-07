/** @format */

import React, { Dispatch, SetStateAction } from "react";
import CustomTable from "../Table/Table";
import { useQuery } from "react-query";
import { PartShape } from "../../interface";

function Parts({
	setParts,
}: {
	setParts: React.Dispatch<SetStateAction<PartShape[]>>;
}) {
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
		setParts(data as PartShape[]);
		const tableRows = data.map((part: PartShape) => ({
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
