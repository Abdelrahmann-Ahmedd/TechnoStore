"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserCart } from "@/store/slices/cartSlice";
import { createCheckoutSession, fetchUserOrders } from "@/store/slices/orderSlice";
import { OrderServices } from "@/services/OrderServices";
import LoadingPage from "@/components/Layout/LoadingPage";
import toast from "react-hot-toast";
import CheckoutCard from "@/components/Product/CheckoutCard";
import { useRouter } from "next/navigation";

interface ShippingForm {
  details: string;
  city: string;
  phone: string;
}

export default function CheckoutView() {
  const dispatch = useAppDispatch();
  const router = useRouter(); 
  const { cart, loading: cartLoading, error: cartError } = useAppSelector(state => state.cart);
  const { user, token } = useAppSelector(state => state.auth);

  const [shipping, setShipping] = useState<ShippingForm>({
    details: "",
    city: "",
    phone: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (token) dispatch(fetchUserCart());
  }, [dispatch, token]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCashOrder = async () => {
    if (!cart?.numOfCartItems) return toast.error("Your cart is empty");

    // Basic validation
    if (!shipping.details || !shipping.city || !shipping.phone)
      return toast.error("Please fill all shipping fields");

    try {
      setIsProcessing(true);
      toast.loading("Placing cash order...");

      const body = {
        shippingAddress1: shipping.details,
        city: shipping.city,
        phone: shipping.phone,
      };

      const { data, error } = await OrderServices.CreateCashSession(cart.data._id, body);
      toast.dismiss();
      if (error) return toast.error(error);

      toast.success("Cash order placed successfully!");
      if (user?._id) dispatch(fetchUserOrders(user._id));
      router.push("/");

    } catch (err) {
      toast.dismiss();
      toast.error("Failed to place cash order");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = async () => {
    if (!cart?.numOfCartItems) return toast.error("Your cart is empty");

    if (!shipping.details || !shipping.city || !shipping.phone)
      return toast.error("Please fill all shipping fields");

    try {
      setIsProcessing(true);
      toast.loading("Redirecting to payment...");

      const body = {
        shippingAddress: shipping,
      };

      const resultAction = await dispatch(
        createCheckoutSession({ cartId: cart.data._id, body })
      );

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
  };

  if (cartLoading) return <LoadingPage />;
  if (cartError) return <div className="text-center text-danger">{cartError}</div>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>

      {!cart || cart.numOfCartItems === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-4">
            <h4>Shipping Info</h4>
            <div className="d-flex flex-column gap-3">
              <input
                type="text"
                name="details"
                value={shipping.details}
                onChange={handleChange}
                placeholder="Street Address"
                className="form-control"
              />
              <input
                type="text"
                name="city"
                value={shipping.city}
                onChange={handleChange}
                placeholder="City"
                className="form-control"
              />
              <input
                type="text"
                name="phone"
                value={shipping.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="form-control"
              />
            </div>
          </div>

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
                  <CheckoutCard key={item._id} item={item} />
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
        </>
      )}
    </div>
  );
}
