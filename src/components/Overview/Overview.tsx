import React from "react";
import './Overview.scss'

function Overview({ parts, cars }: { parts: number; cars: number }) {
	return (
		<div className="overview">
			<div className="item"> 
				<span>{parts}</span>
                <p>Parts</p>
			</div>
            <div className="item">
				<span>{cars}</span>
                <p>Cars</p>
			</div>
            <div className="item">
				<span>0</span>
                <p>Messages</p>
			</div>
            <div className="item">
				<span>50</span>
                <p>Customers</p>
			</div>
		</div>
	);
}

export default Overview;
