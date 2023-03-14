/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../interface";

const initialState: UserState = {
   user: {
      cars: [],
      groups: [],
   },
   isAuth: false,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      login(state, action) {
         state.user = action.payload;
         state.isAuth = true;
      },
      logout(state) {
         state.user = initialState.user;
         state.isAuth = false;
      },
      addCars(state, action) {
         const cars = action.payload;
         state.user.cars = cars
      },
      addCar(state, action) {
         const newCar = action.payload
         const exists = state.user.cars.find((car) => car.id === newCar.id);
         if (!exists) {
            state.user.cars.push(newCar)
         }
      },
      selectCar(state, action) {
         state.user.cars.forEach((car) => {
            car.isSelected = false;
         });
         const carId = action.payload.carId;
         const exists = state.user.cars.find((car) => car.id === carId);
         if (exists) {
            exists.isSelected = true;
         }
      },
      removeCar(state, action) {
         const carId = action.payload.carId;
         const exists = state.user.cars.find((car) => car.id === carId);
         if (exists) {
            const index = state.user.cars.indexOf(exists);
            state.user.cars.splice(index, 1);
         }
      },
   },
});

export const userActions = userSlice.actions;
export default userSlice;
