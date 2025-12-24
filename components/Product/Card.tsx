"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/models/Product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProductToCart } from "@/store/slices/cartSlice";
import { Button } from "../Ui/Button";
import toast from "react-hot-toast";

function OldCard({product,index}:{product: Product, index: number}) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.cart);

  const handleAdd = useCallback(() => {
    dispatch(addProductToCart({ productId: product._id }));
    toast.success(`${product.title} added to cart`);
  },[dispatch,product._id,product.title]);

  return (
    <div className="card" style={{ width: "18rem" }}>
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