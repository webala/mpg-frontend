/** @format */

import axios from "axios";
import { useQuery } from "react-query";
import { OrderItem, OrderShape } from "../../interface";
import { GiMoneyStack } from "react-icons/gi";
import { Switch } from "@chakra-ui/react";

function Order({ order }: { order: OrderShape }) {
   const fetchOrderItems = async () => {
      const response = await axios.get(
         `http://localhost:8000/api/orderitems/${order.id}`
      );
      return response.data;
   };

   const {
      data: orderItems,
      isLoading: isOrdersItemsLoading,
      isError: isOrdersItemsError,
      error: ordersItemsError,
   } = useQuery(["order-items", order.id], fetchOrderItems);

   if (isOrdersItemsLoading) {
      return <div>Loading...</div>;
   }

   console.log("order-items", orderItems);

   return (
      <div className="order">
         <h1 className="heading">Order #{order.id}</h1>
         <div className="summary">
            <div className="info">
               <GiMoneyStack
                  className={
                     order.is_complete
                        ? "paid payment-indicator"
                        : "payment-indicator unpaid"
                  }
               />
               <div className="process">
                  <Switch />
                  <p>Process this order</p>
               </div>
            </div>
            <div className="items">
               <h1 className="sub-heading">Order items</h1>
               {orderItems.map((item: OrderItem, index: number) => (
                  <div className="item">
                     <h1>
                        {item.part.name} #{item.part.part_no} X {item.quantity}{" "}
                        @ {item.part.price}
                     </h1>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Order;
