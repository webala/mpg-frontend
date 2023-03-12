/** @format */

import React from "react";
import { useQuery } from "react-query";
import Part from "../Part/Part";
import "./Category.scss";
import placeholder from "../../assets/tyres.jpg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { PartShape } from "../../interface";
import { useNavigate } from "react-router-dom";

type CategoryProps = {
   setCart: Function;
   categoryName: string;
};

function Category({ setCart, categoryName }: CategoryProps) {
   const navigate = useNavigate();

   return (
      <div
         className="category"
         onClick={() => navigate("/parts", { state: { categoryName } })}
      >
         <div className="heading">
            <img src={placeholder} alt={categoryName} />
            <div className="text">
               <h1>{categoryName}</h1>
               <a href="#">
                  <p>View all</p>
                  <AiOutlineArrowRight />
               </a>
            </div>
         </div>
         {/* <div className="parts">
				{data.map((item:PartShape, index:number) => {
					return <Part setCart={setCart} part={item} key={index} />;
				})}
			</div> */}
      </div>
   );
}

export default Category;
