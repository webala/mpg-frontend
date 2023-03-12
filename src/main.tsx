import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./pages/Home/Home";
import Payment from "./pages/Payment/Payment";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CategoryParts from "./components/CategoryParts/CategoryParts";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "/dashboard",
      element: <Dashboard />,
   },
   {
      path: "/payment",
      element: <Payment />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/register",
      element: <Register />,
   },
   {
      path: "/parts",
      element: <CategoryParts />,
   },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}>
         <QueryClientProvider client={queryClient}>
            <ChakraProvider>
               <RouterProvider router={router} />
            </ChakraProvider>
         </QueryClientProvider>
      </Provider>
   </React.StrictMode>
);
