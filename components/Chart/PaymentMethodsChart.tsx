"use client";

import { ChartOptions, TooltipItem } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function PaymentMethodsChart() {
    const data = {
        labels: ["Credit Card", "PayPal", "Cash on Delivery", "Apple Pay"],
        datasets: [
        {
            label: "Payments",
            data: [55, 25, 15, 5],
            backgroundColor: [
            "rgba(75, 192, 192, 0.8)",   // Credit Card
            "rgba(153, 102, 255, 0.8)",  // PayPal
            "rgba(255, 159, 64, 0.8)",   // COD
            "rgba(255, 99, 132, 0.8)",   // Apple Pay
            ],
            hoverOffset: 8,
            borderWidth: 2,
        },
        ],
    };

    const options:ChartOptions<"pie"> = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
        legend: {
            position: "bottom",
            labels: { padding: 20 },
        },

        tooltip: {
            callbacks: {
            label: (ctx: TooltipItem<"pie">) => `${ctx.label}: ${ctx.parsed} payments`,
            },
        },
        },
    };

    return (
        <div className="bg-white p-3 rounded-3 shadow-sm" style={{ height: 340 }}>
            <h5 className="mb-3">Payment Methods</h5>
            <Pie data={data} options={options} />
        </div>
    );
}
