"use client"
import React from 'react'
import { Line } from 'react-chartjs-2';

export default  React.memo(function RevenueChart() {
    
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
        {
            label: "Revenue",
            data: [12000, 15000, 11000, 18000, 20000, 23000],
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13,110,253,0.2)",
            fill: true,
            tension: 0.4
        }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
        legend: { display: false }
        }
    };
    
    return (
        <div className="bg-white p-3 rounded-3 shadow-sm">
            <h5 className="mb-3">Revenue Over Time</h5>
            <Line data={data} options={options} />
        </div>
    )
})
