import axios from "axios";
import { useQuery } from "react-query";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import "./Dashboard.scss"
import Orders from "../../components/Orders/Orders";
import Clients from "../../components/Clients/Clients";

function Dashboard() {
	

	const fetchMpesaTransactions = async () => {
		const response = await axios.get(
			"http://localhost:8000/api/transactions/mpesa"
		);
		return response.data;
	};

	const fetchPesapalTransactions = async () => {
		const response = await axios.get(
			"http://localhost:8000/api/transactions/pesapal"
		);
		return response.data;
	};

	

	const {
		data: pesapalTransctions,
		isLoading: isPesapalTransctionsLoading,
		isError: isPesapalTransctionsError,
		error: pesapalTransctionsError,
		isSuccess: pesapalTransctionsSuccess,
	} = useQuery("pesapal-transactions", fetchPesapalTransactions);

	const {
		data: mpesaTransctions,
		isLoading: isMpesaTransctionsLoading,
		isError: isMpesaTransctionsError,
		error: mpesaTransctionsError,
		isSuccess: mpesaTransctionsSuccess,
	} = useQuery("mpesa-transactions", fetchMpesaTransactions);

	

	// console.log("clients: ", clients);

	return (
      <div className="dashboard">
         <div className="tables">
            <Tabs variant="soft-rounded" colorScheme="red">
               <TabList>
                  <Tab>Orders</Tab>
                  {/* <Tab>Mpesa Transactions</Tab>
                  <Tab>Pesapal Transactions</Tab> */}
                  <Tab>Client list</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel>
                     <Orders />
                  </TabPanel>
                  {/* <TabPanel>
                     <p>two!</p>
                  </TabPanel>
                  <TabPanel>
                     <p>two!</p>
                  </TabPanel> */}
                  <TabPanel>
                     <Clients />
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </div>
      </div>
   );
}

export default Dashboard;
