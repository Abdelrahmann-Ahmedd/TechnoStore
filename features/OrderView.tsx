"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserOrders } from "@/store/slices/orderSlice";
import { fetchUserCart } from "@/store/slices/cartSlice";
import LoadingPage from "@/components/Layout/LoadingPage";
import Image from "next/image";

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

  const memoOrders = useMemo(()=>{
    return orders;
  },[orders])

  if (loading || loadingCart) return <LoadingPage />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!memoOrders || memoOrders.length === 0)
    return <div className="text-center py-5 fs-5 text-muted">No orders found.</div>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold">My Orders</h1>

      <div className="d-flex flex-column gap-4">
        {memoOrders.map((order) => (
          <div
            key={order._id}
            className="p-3 rounded-3 shadow-sm border bg-white"
          >
            <div className="row align-items-center g-3">
              {/* Order ID */}
              <div className="col-12 col-md-3">
                <h6 className="mb-1 text-muted small">Order ID</h6>
                <div className="fw-semibold text-break">{order._id}</div>
              </div>

              {/* Products */}
              <div className="col-12 col-md-4">
                <h6 className="mb-1 text-muted small">Products</h6>
                <ul className="list-unstyled mb-0">
                  {order.cartItems?.map((item) => (
                    <li
                      key={item.product._id}
                      className="d-flex align-items-center gap-2 mb-2"
                    >
                      <Image
                        loading="lazy"
                        width={200}
                        height={200}
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="rounded-2 w-50"
                      />
                      <div className="flex-grow-1 text-truncate">
                        <div
                          className="fw-semibold small text-truncate"
                          title={item.product.title}
                        >
                          {item.product.title}
                        </div>
                        <div className="text-muted small">× {item.count}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total Price */}
              <div className="col-6 col-md-2 text-center text-md-start">
                <h6 className="mb-1 text-muted small">Total</h6>
                <div className="fw-semibold">{order.totalOrderPrice} EGP</div>
              </div>

              {/* Status */}
              <div className="col-6 col-md-1 text-center text-md-start">
                <h6 className="mb-1 text-muted small">Status</h6>
                <span
                  className={`badge ${
                    order.isPaid ? "bg-success" : "bg-warning text-dark"
                  } px-3 py-2 rounded-pill`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              {/* Date */}
              <div className="col-12 col-md-2 text-md-end text-muted small">
                <h6 className="mb-1 text-muted small">Date</h6>
                {order.createdAt.split("T")[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
