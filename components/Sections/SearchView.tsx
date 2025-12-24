"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { SearchCard } from "@/components/Product/SearchCard";

interface SearchViewProps {
  query: string;
}

export const SearchView: React.FC<SearchViewProps> = React.memo(({ query }) => {
  const { products } = useAppSelector((state) => state.products);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredProducts = useMemo(() => {
    if (debouncedQuery.trim().length <= 1) return [];
    return products
      .filter((p) =>
        p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      .slice(0, 6);
  }, [products, debouncedQuery]);

  useEffect(() => {
    setShow(filteredProducts.length > 0 || debouncedQuery.trim().length > 1);
  }, [filteredProducts, debouncedQuery]);

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
          <SearchCard key={p._id} searchModel={{ product: p, setShow }} />
        ))
      )}
    </div>
  );
});
