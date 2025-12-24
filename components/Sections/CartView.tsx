"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserCart,
  clearUserCart,
} from "@/store/slices/cartSlice";
import LoadingPage from "@/components/Layout/LoadingPage";
import { Button } from "@/components/Ui/Button";
import toast from "react-hot-toast";
import Link from "next/link";
import {CartCard} from "@/components/Product/CartCard";

export default function CartView() {
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cart);
  
  const handleClearCart = useCallback(() => {
    dispatch(clearUserCart());
    toast('Cart cleared', { icon: '🗑' });
    },[dispatch])
  
  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);




  if (loading) return <LoadingPage />;

  if (error)
    return (
      <div className="text-danger text-center p-4">
        Failed to load cart: {error}
      </div>
    );

  const products = cart?.data?.products ?? [];

  if (products.length === 0)
    return (
      <div className="text-center py-10 mt-5">
        <h2 className="h4 mb-3">Your cart is empty</h2>
        <Button color="primary" outline={false} href="/" rounded={2} target={false}>
          Go to Add Product
        </Button>
      </div>
    );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">🛒 Your Cart</h1>

      {products.map((item,ind) => (
        <CartCard key={item._id} item={item} index={ind} />
      ))}

      <div className="row mt-4 pt-3 border-top align-items-center">
        <div className="col-12 col-md-6">
          <h5 className="text-primary fs-3">Total: {cart?.data?.totalCartPrice} EGP</h5>
          <Button outline={false} rounded={2} color="primary" href="/checkout" target={false}  >Checkout</Button>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0">
          <button
            className="btn btn-danger"
            onClick={handleClearCart}
          >
            🗑 Clear Cart
          </button>
          <Link href="/order"  className="btn btn-warning ms-3">
            Last Order
          </Link>
        </div>
      </div>
    </div>
  );
}

