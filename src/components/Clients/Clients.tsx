/** @format */

import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ClientShape } from "../../interface";
import CustomTable from "../Table/Table";

function Clients() {
   const tableColumns = ["name", "Phone number", "email", "Subscription"];

   const fetchClients = async () => {
      const response = await axios.get("http://localhost:8000/api/clients");
      return response.data;
   };

   const {
      data: clients,
      isLoading: isClientsLoading,
      isError: isClientsError,
      error: clientError,
      isSuccess: isClientSuccess,
   } = useQuery("clients", fetchClients);

   if (isClientsLoading) {
      return <div>loading</div>;
   }

   const tableData = clients.map((client: ClientShape) => ({
      name: `${client.first_name} ${client.last_name}`,
      phone_number: client.phone_number,
      email: client.email,
      subscription: client.is_subscribed,
   }));

   return (
      <CustomTable
         totalRegisters={clients.length}
         tableColumns={tableColumns}
         tableData={tableData}
         title="Client list"
      />
   );
}

export default Clients;
