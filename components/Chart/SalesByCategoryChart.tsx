"use client";

import { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import { TooltipItem } from './../../node_modules/chart.js/dist/types/index.d';

export default function SalesByCategoryChart() {
    const data = {
        labels: ["Electronics", "Clothing", "Home", "Beauty", "Sports"],
        datasets: [
        {
            label: "Sales ($)",
            data: [12000, 8000, 5000, 4000, 6000],
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1.5,
            hoverBackgroundColor: "rgba(54, 162, 235, 0.9)",
        },
        ],
    };

    const options: ChartOptions<"bar">= {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
        legend: { display: false },

        tooltip: {
            callbacks: {
            label: (tooltipItem: TooltipItem<"bar">) => `Sales: $${tooltipItem.parsed.y}`,
            },
        },
        },

        scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true },
        },
    };

    return (
        <div className="bg-white p-3 rounded-3 shadow-sm" style={{ height: 350 }}>
        <h5 className="mb-3">Sales by Category</h5>
        <Bar data={data} options={options} />
        </div>
    );
}
