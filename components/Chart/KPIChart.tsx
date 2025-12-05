import React from 'react'
import KPI from '../Ui/KPI'

export default function KPIChart() {
    return (
            <section className="container py-4">
        <div className="row g-4">
            <div className="col-xl-3 col-lg-4 col-md-6">
            <KPI icon='fa-solid fa-dollar-sign' title="Total Revenue" color="#FFB100" data={20000} />
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
            <KPI icon='fa-brands fa-first-order' title="Total Orders" color="#0D6EFD" data={450} />
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
            <KPI icon='fa-solid fa-user' title="New Customers" color="#198754" data={120} />
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6">
            <KPI icon='fa-solid fa-hourglass-end' title="Pending Orders" color="#DC3545" data={32} />
            </div>
        </div>
        </section>
    )
}
