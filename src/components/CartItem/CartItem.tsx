import React from "react";
import { useQuery } from "react-query";

function CartItem({ id, quantity }) {
	

	const fetchPart = async (id: number) => {
        const response = await fetch(`http://localhost:8000/api/part/${id}`)

        if (!response.ok) {
            throw Error('Something went wrong')
        }
        const part = await response.json()
        return part
    };

	const { data, isLoading, isError, error } = useQuery(["part", id], () =>
		fetchPart(id)
	);

    if (isLoading) {
        return <p>Loading part...</p>
    }

    if(isError) {
        return <p>Something went wrong</p>
    }

    console.log('data: ',data)

	return <div></div>;
}

export default CartItem;
