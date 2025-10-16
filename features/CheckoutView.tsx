"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserCart } from "@/store/slices/cartSlice";
import { createCheckoutSession, fetchUserOrders } from "@/store/slices/orderSlice";
import { OrderServices } from "@/services/OrderServices";
import LoadingPage from "@/components/Layout/LoadingPage";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CheckoutView() {
  const dispatch = useAppDispatch();
  const { cart, loading: cartLoading, error: cartError } = useAppSelector(state => state.cart);
  const { user, token } = useAppSelector(state => state.auth);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (token) dispatch(fetchUserCart());
    console.log(cart);
  }, [dispatch, token]);

  async function handleCashOrder() {
    if (!cart?.numOfCartItems) return toast.error("Your cart is empty");

    try {
      setIsProcessing(true);
      toast.loading("Placing cash order...");

      const body = {
        shippingAddress1: "123 Street",
        city: "Cairo",
        zip: "12345",
        country: "Egypt",
        phone: "0123456789",
      };

      const { data, error } = await OrderServices.CreateCashSession(cart.data._id, body);
      toast.dismiss();
      if (error) return toast.error(error);

      toast.success("Cash order placed successfully!");

      if (user?._id) dispatch(fetchUserOrders(user._id));
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to place cash order");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleCheckout() {
    if (!cart?.numOfCartItems) return toast.error("Your cart is empty");

    try {
      setIsProcessing(true);
      toast.loading("Redirecting to payment...");

      const body = {
        shippingAddress: {
          details: "123 Street",
          city: "Cairo",
          phone: "0123456789",
        },
      };

      const resultAction = await dispatch(createCheckoutSession({ cartId: cart.data._id, body }));

      toast.dismiss();

      if (createCheckoutSession.fulfilled.match(resultAction)) {
        const checkoutData = resultAction.payload as { session: { url: string } };
        toast.success("Redirecting...");
        window.location.href = checkoutData.session.url;
      } else {
        toast.error(resultAction.payload as string);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to create checkout session");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }

  if (cartLoading) return <LoadingPage />;
  if (cartError) return <div className="text-center text-danger">{cartError}</div>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>

      {!cart || cart.numOfCartItems === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.data.products.map(item => (
                <tr key={item.product._id}>
                  <td className="d-flex align-items-center gap-2">
                    <Image
                      className="rounded-2"
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={50}
                      height={50}
                      loading = "lazy"
                    />
                    <span>{item.product.title}</span>
                  </td>
                  <td>{item.count}</td>
                  <td>{item.price} EGP</td>
                  <td>{item.count * item.price} EGP</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: {cart.data.totalCartPrice} EGP</h4>
            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-success"
                disabled={isProcessing}
                onClick={handleCashOrder}
              >
                Cash on Delivery
              </button>
              <button
                className="btn btn-primary"
                disabled={isProcessing}
                onClick={handleCheckout}
              >
                Pay Online
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
