/** @format */

import React from "react";
import { iCar } from "../../pages/Dashboard/Dashboard";
import CustomTable from "../Table/Table";
import { useQuery } from "react-query";

function Cars() {
   const tableColumns = [
      "make",
      "series",
      "model",
      "year",
      "body type",
      "engine",
   ];
   const fetchCars = async () => {
      const response = await fetch("http://localhost:8000/api/cars/");
      if (!response.ok) {
         throw Error("something went wrong");
      }

      const jsonRes = await response.json();
      return jsonRes;
   };

   const { data, isError, error, isLoading } = useQuery("cars", fetchCars);

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (isError && error) {
      console.log(error);
      return <div>Error</div>;
   }

   const tableRows = data.results.map((car: iCar) => ({
      make: car.make,
      series: car.series,
      model: car.model,
      year: car.year,
      body_type: car.body_type,
      engine: car.engine,
   }));

   return (
      <div>
         <CustomTable
            totalRegisters={data.results.length}
            tableColumns={tableColumns}
            tableData={tableRows}
            title="Cars"
         />
      </div>
   );
}

export default Cars;