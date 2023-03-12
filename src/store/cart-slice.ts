/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { CartItem, Cart } from "../interface";

export const initialCartState: { cart: Cart } = {
   cart: {
      cartItems: [],
   },
};

const cartSlice = createSlice({
   name: "cart",
   initialState: initialCartState,
   reducers: {
      addToCart(state, action) {
         const productId = action.payload;
         const exists: CartItem | undefined = state.cart.cartItems.find(
            (item: CartItem) => item.productId == productId
         );

         if (exists) {
            exists.quantity += 1;
         } else {
            const cartItem: CartItem = {
               productId,
               quantity: 1,
            };
            state.cart.cartItems.push(cartItem);
         }

      },
      removeFromCart(state, action) {
         const productId = action.payload.productId;
         const exists: CartItem | undefined = state.cart.cartItems.find(
            (item: CartItem) => item.productId == productId
         );
         if (exists) {
            exists.quantity -= 1
            if (exists.quantity <= 1) {
               const index = state.cart.cartItems.indexOf(exists)
               delete state.cart.cartItems[index]
            }
         }
      },
      resetCart(state) {
         state.cart.cartItems = []
      },
   },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
