"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserOrders } from "@/store/slices/orderSlice";
import { fetchUserCart } from "@/store/slices/cartSlice";
import LoadingPage from "@/components/Layout/LoadingPage";
import {OrderCard} from "@/components/Product/OrderCard";

export default function OrderView() {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const { cart, loading: loadingCart } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(fetchUserCart());
  }, [dispatch, token]);

  useEffect(() => {
    if (cart?.data?.cartOwner) dispatch(fetchUserOrders(cart.data.cartOwner));
  }, [dispatch, cart]);


  if (loading || loadingCart) return <LoadingPage />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!orders || orders.length === 0)
    return <div className="text-center py-5 fs-5 text-muted">No orders found.</div>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold">My Orders</h1>

      <div className="d-flex flex-column gap-4">
        {orders.map((order,ind) => (
          <OrderCard key={order._id} order={order} index={ind} />
        ))}
      </div>
    </div>
  );
}
