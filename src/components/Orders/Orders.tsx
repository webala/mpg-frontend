/** @format */

import axios from "axios";
import "./Orders.scss";
import { useQuery } from "react-query";
import { OrderShape } from "../../interface";
import Order from "./Order";

function Orders() {
   const tableColumns = [];

   const fetchOrders = async () => {
      const response = await axios.get("http://localhost:8000/api/orderslist");
      return response.data;
   };

   const {
      data: orders,
      isLoading: isOrdersLoading,
      isError: isOrdersError,
      error: ordersError,
   } = useQuery("orders", fetchOrders);

   if (isOrdersLoading) {
      return <div>Loading ...</div>;
   }

   return (
      <div className="orders">
         {orders.map((order: OrderShape, index: number) => (
            <Order order={order} />
         ))}
      </div>
   );
}

export default Orders;
