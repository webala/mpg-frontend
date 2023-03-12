/** @format */

import React from "react";
import placeholder from "../../assets/placeholder.png";
import "./Part.scss";
import { FaCartArrowDown } from "react-icons/fa";
import { getCookie, modifyCartCookie } from "../../cart";
import { PartShape } from "../../interface";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

type PartProps = {
   part: PartShape;
};

function Part({ part }: PartProps) {

   const dispatch = useDispatch();

   const addToCart = () => {
      dispatch(cartActions.addToCart({ productId: part.id }));
   };

   return (
      <div className="part">
         <img
            src={part.image_url ? part.image_url : placeholder}
            alt="temp-placeholder"
         />
         <div>
            <p>{part.name}</p>
            <p>{part.description}</p>
            <div className="add-to-cart">
               <button onClick={addToCart}>
                  <FaCartArrowDown />
               </button>
            </div>
         </div>
      </div>
   );
}

export default Part;
