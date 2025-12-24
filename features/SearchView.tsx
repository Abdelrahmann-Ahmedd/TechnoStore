"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import {SearchCard} from "@/components/Product/SearchCard";

function OldSearchView({ query }: { query: string }) {
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
          <SearchCard key={p._id} searchModel={{product:p,setShow}} />
        ))
      )}
    </div>
  );
}

export const SearchView = React.memo(OldSearchView); 