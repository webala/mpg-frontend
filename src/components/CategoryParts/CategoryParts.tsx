/** @format */

import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { GlobalState, PartShape } from "../../interface";
import Part from "../Part/Part";
import pluralize from "pluralize";
import { useSelector } from "react-redux";
import "./CategoryParts.scss";
import Navbar from "../Navbar/Navbar";
import { useDisclosure } from "@chakra-ui/react";
import Cart from "../Cart/Cart";
import { useState } from "react";
import { getCookie } from "../../cart";
import SelectCar from "../SelectCar/SelectCar";
import Footer from "../Footer/Footer";

export default function CategoryParts() {
   const location = useLocation();
   const categoryName = location.state.categoryName;
   const cars = useSelector((state: GlobalState) => state.cars.cars);
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [cart, setCart] = useState(JSON.parse(getCookie("cart") as string));

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

   const heading = pluralize(categoryName, parts.length);
   return (
      <div className="category-parts">
         <Navbar onOpen={onOpen} />
         <SelectCar cars={cars} />
         <h1 className="title">{heading}</h1>
         <div className="parts">
            {parts.map((part: PartShape, index: number) => (
               <Part part={part} />
            ))}
         </div>
         <Cart
            setCart={setCart}
            cart={cart}
            isOpen={isOpen}
            onClose={onClose}
         />
         <Footer />
      </div>
   );
}
