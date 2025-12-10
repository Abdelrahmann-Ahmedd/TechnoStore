"use client";

import { ChartOptions, TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";



export default function OrdersStatusChart() {
    const data = {
        labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        datasets: [
        {
            label: "Orders",
            data: [40, 25, 15, 80, 5], // Sample data
            backgroundColor: [
            "rgba(255, 205, 86, 0.8)",   // Pending
            "rgba(54, 162, 235, 0.8)",   // Processing
            "rgba(153, 102, 255, 0.8)",  // Shipped
            "rgba(75, 192, 192, 0.8)",   // Delivered
            "rgba(255, 99, 132, 0.8)",   // Cancelled
            ],
            borderWidth: 2,
            hoverBorderWidth: 3,
        },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        cutout: "60%", // Modern donut effect

        plugins: {
        legend: {
            position: "bottom",
            labels: {
            padding: 20,
            boxWidth: 18,
            },
        },

        tooltip: {
            callbacks: {
            label: function (context: TooltipItem<"doughnut">) {
                const label = context.label || "";
                const value = context.parsed;
                return `${label}: ${value} orders`;
            },
            },
        },
        },

        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="bg-white p-3 rounded-3 shadow-sm mb-2" style={{ height: 330 }}>
            <h5 className="mb-3">Orders by Status</h5>
            <Doughnut data={data} options={options} />
        </div>
    );
}
