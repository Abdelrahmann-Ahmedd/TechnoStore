"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllOrders } from "@/store/slices/orderSlice";
import LoadingPage from "@/components/Layout/LoadingPage";
import {OrderCard} from "@/components/Product/OrderCard";

export default function AllOrder() {
  const dispatch = useAppDispatch();
  const { allOrders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (loading) return <LoadingPage />;
  if (error)
    return <div className="text-center text-danger py-5">{error}</div>;
  if (!allOrders || allOrders.length === 0)
    return (
      <div className="text-center py-5 fs-5 text-muted">No orders found.</div>
    );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">All Orders</h2>
      <div className="d-flex flex-column gap-4">
        {allOrders.map((order,ind) => (
          <OrderCard key={order._id} order={order} index={ind} />
        ))}
      </div>
    </div>
  );
}
