/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import carsSlice from "./cars-slice";
import cartSlice, { initialCartState } from "./cart-slice";
import { persistReducer, persistStore, createMigrate } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { GlobalState } from "../interface";

const migrations = {
   0: (state: any) => {
      return {
         ...state,
         cart: initialCartState,
      };
   },
};
const persistConfig = {
   key: "root",
   version: 0,
   storage,
   migrations: createMigrate(migrations),
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
   reducer: {
      user: persistedUserReducer,
      cars: carsSlice.reducer,
      cart: persistedCartReducer,
   },
   middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
