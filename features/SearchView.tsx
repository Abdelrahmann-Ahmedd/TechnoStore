"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import Image from "next/image";

export default function SearchView({ query }: { query: string }) {
  const { products } = useAppSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 6)); // show up to 6 results
      setShow(true);
    } else {
      setShow(false);
    }
  }, [query, products]);

  if (!show) return null;

  return (
    <div
      className="position-absolute top-100 bg-white shadow-lg rounded w-100 mt-1 p-2 z-3"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      {filteredProducts.length === 0 ? (
        <div className="text-center py-2 text-muted">No products found.</div>
      ) : (
        filteredProducts.map((p) => (
          <Link
            key={p._id}
            href={`/product/${p._id}`}
            className="d-flex align-items-center gap-2 text-decoration-none text-dark py-2 border-bottom"
            onClick={() => setShow(false)}
          >
            <Image
              src={p.imageCover}
              alt={p.title}
              width={40}
              height={40}
              className="rounded"
            />
            <div className="d-flex flex-column">
              <span className="fw-semibold small">{p.title}</span>
              <span className="text-muted small">{p.price} EGP</span>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
