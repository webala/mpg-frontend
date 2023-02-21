/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import carsSlice from "./cars-slice";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
   key: "root",
   storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

const store = configureStore({
   reducer: {
      user: persistedReducer,
      cars: carsSlice.reducer,
   },
   middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
