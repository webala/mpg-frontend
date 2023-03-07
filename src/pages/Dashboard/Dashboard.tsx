import axios from "axios";
import { useQuery } from "react-query";

function Dashboard() {
	const fetchOrders = async () => {
		const response = await axios.get("http://localhost:8000/api/orderslist");
		return response.data;
	};

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

	const fetchClients = async () => {
		const response = await axios.get("http://localhost:8000/api/clients");
		return response.data;
	};

	const {
		data: orders,
		isLoading: isOrdersLoading,
		isError: isOrdersError,
		error: ordersError,
	} = useQuery("orders", fetchOrders);

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

	console.log("clients: ", clients);

	return <div className="dashboard"></div>;
}

export default Dashboard;
