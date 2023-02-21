/** @format */

import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { getCookie } from "../../cart";
import Cart from "../../components/Cart/Cart";
import Navbar from "../../components/Navbar/Navbar";
import Parts from "../../components/Parts/Parts";
import Hero from "../../components/Hero/Hero";
import AdminActions from "../../components/AdminActions/AdminActions";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { carsActions } from "../../store/cars-slice";

function Home() {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [cart, setCart] = useState(JSON.parse(getCookie("cart") as string));

   const dispatch = useDispatch();

   const fetchCars = async () => {
      const response = await fetch("http://localhost:8000/api/cars/");
      if (!response.ok) {
         throw Error("something went wrong");
      }

      const jsonRes = await response.json();
      return jsonRes;
   };

   const { data, isSuccess } = useQuery("cars", fetchCars);

   if (isSuccess) {
      console.log("cars: ", data);
      dispatch(carsActions.serCars(data));
   }
   return (
      <div>
         <Hero onOpen={onOpen} />
         <AdminActions />
         <Parts setCart={setCart} />
         <Cart
            setCart={setCart}
            cart={cart}
            isOpen={isOpen}
            onClose={onClose}
         />
      </div>
   );
}

export default Home;
