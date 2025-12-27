"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/models/Product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProductToCart, deleteItemFromCart } from "@/store/slices/cartSlice";
import { Button } from "../Ui/Button";
import toast from "react-hot-toast";
import { addProductToWishlist, deleteProductFromWishlist, fetchWishlistProducts } from "@/store/slices/productSlice";

function OldCard({product,index,active}:{product: Product, index: number, active: boolean}) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.cart);

  const handleAdd = useCallback(() => {
    dispatch(addProductToCart({ productId: product._id }));
    toast.success(`${product.title} added to cart`);
  },[dispatch,product._id,product.title]);

  const handleAddToWishlist = useCallback(async () => {
    toast.loading(`${product.title} adding to wishlist....`);
    try {
      await dispatch(addProductToWishlist({ productId: product._id }));
      dispatch(fetchWishlistProducts());
      toast.success(`${product.title} added to wishlist`);
    }finally {
      toast.dismissAll()
    }
}, [dispatch, product._id, product.title]);

const handleDeleteFromWishlist = useCallback(async () => {
  toast.loading(`${product.title} Remove From wishlist....`);
  try {
    await dispatch(deleteProductFromWishlist(product._id));
    dispatch(fetchWishlistProducts());
    toast.success(`${product.title} removed from wishlist`);
  }finally{
    toast.dismissAll()
  }
}, [dispatch, product._id, product.title]);


  return (
    <div className="card position-relative" style={{ width: "18rem" }}>
      <Link href={`/product/${product._id}`}>
        <figure className="w-100">
          <Image
            priority={index < 4}
            loading={index < 8 ? "eager" : "lazy"}
            style={{ width: "auto", height: "auto" }}
            width={300}
            height={300}
            src={product.imageCover}
            className="card-img-top w-100"
            alt={`Product image of ${product.title}`}
          />
        </figure>
        <div className="card-body text-center h-75">
          <h4 className="card-title text-black">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h4>
          <h6 className="card-title text-primary">{product.category.name}</h6>
          <p className="card-text text-black">{product.price} EGP</p>
        </div>
      </Link>
      {active ? (
        <i onClick={handleDeleteFromWishlist} className="position-absolute fa-solid fa-heart fs-2 text-danger"></i>
      ) : (
        <i onClick={handleAddToWishlist} className="position-absolute fa-regular fa-heart fs-2"></i>
      ) }
      <Button
        onClick={handleAdd}
        color="primary"
        rounded={3}
        outline={false}
        target={false}
      >
        {loading ? "Adding..." : "Add To Cart"}
      </Button>
    </div>
  );
}

export const Card = React.memo(OldCard);