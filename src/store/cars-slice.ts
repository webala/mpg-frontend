/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cars: []
}

const carsSlice = createSlice({
   name: 'cars',
   initialState,
   reducers: {
      serCars(state, action) {
         state.cars = action.payload
      }
   }
})

export const carsActions = carsSlice.actions;
export default carsSlice;