/** @format */

import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { PartShape } from "../../interface";
import Part from "../Part/Part";

export default function CategoryParts() {
   const location = useLocation();
   const categoryName = location.state.categoryName;

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

   const {
      data: parts,
      isLoading,
      isError,
      isSuccess,
      error,
   } = useQuery(["parts", categoryName], fetchCategoryParts);

   if (isLoading) {
      return <p>Loading parts ...</p>;
   }

   if (isError) {
      console.log("error: ", error);
      return <p>Something went wron</p>;
   }
   return (
      <div className="category-parts">
         {parts.map((part: PartShape, index: number) => (
            <Part part={part} />
         ))}
      </div>
   );
}
