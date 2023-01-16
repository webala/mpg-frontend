import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import "./Table.scss";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";

function CustomTable({ totalRegisters, tableColumns, tableData, title }) {
	const [page, setPage] = useState(1);
	return (
		<div className="table">
			<TableContainer>
				<Table variant="simple" size={`sm`}>
					<TableCaption>{title}</TableCaption>
					<Thead>
						<Tr>
							{tableColumns.map((col: string, index: number) => (
								<Th key={index}>{col}</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{tableData.map(
							(
								data,
								index
							) => {
								const keys:string[] = Object.keys(data);

								return (
									<Tr key={index}>
										{keys.map((key, index) => (
											<Td key={index}>{data[key]}</Td>
										))}
									</Tr>
								);
							}
						)}
					</Tbody>
					<Tfoot>
						<Tr>
							{tableColumns.map((col: string, index: number) => (
								<Th key={index}>{col}</Th>
							))}
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</div>
	);
}

export default CustomTable;
