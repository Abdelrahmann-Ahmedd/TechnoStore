"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserCart,
  updateUserCart,
  deleteItemFromCart,
  clearUserCart,
} from "@/store/slices/cartSlice";
import LoadingPage from "@/components/Layout/LoadingPage";
import { Button } from "@/components/Ui/Button";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CartView() {
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cart);
  
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

      {products.map((item) => (
        <div key={item._id} className="row align-items-center mb-4 py-3 border rounded">
          <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-100 img-fluid rounded"
              style={{ maxHeight: "120px" }}
              loading="lazy"
            />
          </div>

          <div className="col-12 col-md-6">
            <h5>{item.product.title}</h5>
            <p className="mb-1 text-muted">
              {item.product.price} EGP × {item.count}
            </p>
            <p className="mb-1 fw-semibold">Subtotal: {item.price} EGP</p>
          </div>

          <div className="col-12 col-md-3 text-md-end d-flex flex-column align-items-center align-items-md-end gap-2">
            <div className="d-flex align-items-center mb-2">
              <button
                className="btn btn-outline-danger btn-sm px-3"
                onClick={() => {
                  if (item.count <= 1) return;
                  dispatch(
                    updateUserCart({
                      id: item.product._id,
                      body: { count: item.count - 1 },
                    })
                  );
                  toast.success(`Decreased quantity of ${item.product.title}`);
                }}
                disabled={item.count <= 1}
              >
                -
              </button>
              <span className="px-2 fs-4">{item.count}</span>
              <button
                className="btn btn-outline-success btn-sm px-3"
                onClick={() => {
                  dispatch(
                    updateUserCart({
                      id: item.product._id,
                      body: { count: item.count + 1 },
                    })
                  );
                  toast.success(`Increased quantity of ${item.product.title}`);
                }}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteItemFromCart(item.product._id));
                toast.error(`${item.product.title} removed from cart`);
              }}
            >
              🗑 Remove
            </button>
          </div>
        </div>
      ))}

      <div className="row mt-4 pt-3 border-top align-items-center">
        <div className="col-12 col-md-6">
          <h5 className="text-primary fs-3">Total: {cart?.data?.totalCartPrice} EGP</h5>
          <Button outline={false} rounded={2} color="primary" href="/checkout" target={false}  >Checkout</Button>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0">
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(clearUserCart());
              toast('Cart cleared', { icon: '🗑' });
            }}
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

