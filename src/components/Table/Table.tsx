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
import { Car, PartShape } from "../../interface";

type CustomTableProps = {
	totalRegisters: number;
	tableColumns: string[];
	tableData: Car[] | PartShape[];
	title: string;
};

function CustomTable({
	totalRegisters,
	tableColumns,
	tableData,
	title,
}: CustomTableProps) {
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
						{tableData.map((data: Car | PartShape, index: number) => {
							const keys: string[] = Object.keys(data);
							// const keys: number[] = keyStrings.map(key => parseInt(key))

							return (
								<Tr key={index}>
									{keys.map((key, index) => (
										<Td key={index}>{data[key] as string}</Td>
									))}
								</Tr>
							);
						})}
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
