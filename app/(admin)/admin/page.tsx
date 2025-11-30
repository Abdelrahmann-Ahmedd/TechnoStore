import KPIChart from '@/components/Chart/KPIChart'
import OrdersStatusChart from '@/components/Chart/OrdersStatusChart'
import RevenueChart from '@/components/Chart/RevenueChart'
import React from 'react'
import SalesByCategoryChart from './../../../components/Chart/SalesByCategoryChart';
import PaymentMethodsChart from '@/components/Chart/PaymentMethodsChart';

export default function  page() {
  return (
    <>
      <h2 className='text-center fw-bold'>Dashboard</h2>
      <section className="container py-4">
        <div className="row g-3">
          <KPIChart />
        </div>
        <div className="row g-3">
          <div className='col-lg-6'>
            <OrdersStatusChart />
          </div>
          <div className="col-lg-6">
            <RevenueChart />
          </div>
        </div>
        <div className="row mt-2 g-3">
          <div className="col-lg-6">
            <SalesByCategoryChart/>
          </div>
          <div className="col-lg-6">
            <PaymentMethodsChart/>
          </div>
        </div>
      </section>
    </>
  )
}
