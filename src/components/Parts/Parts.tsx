/** @format */

import React from "react";
import CustomTable from "../Table/Table";
import { useQuery } from "react-query";

function Parts() {
   const fetchParts = async () => {
      const response = await fetch("http://localhost:8000/api/parts/");

      if (!response.ok) {
         throw Error("Something webt wrong");
      }
      const jsonRes = await response.json();
      return jsonRes;
   };

   const { data, isError, error, isLoading } = useQuery("parts", fetchParts);

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (isError && error) {
      console.log(error);
      return <div>Error</div>;
   }
   const tableColumns = ["Part No.", "Cars"];

   const tableRows = data.results.map((part) => ({
      part_no: part.part_no,
      cars: part.cars.length,
   }));
   return (
      <div>
         <CustomTable
            totalRegisters={data.results.length}
            tableColumns={tableColumns}
            tableData={tableRows}
            title="Parts"
         />
      </div>
   );
}

export default Parts;
