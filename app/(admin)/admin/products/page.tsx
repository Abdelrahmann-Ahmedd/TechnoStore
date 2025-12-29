"use client";
import LoadingPage from '@/components/Layout/LoadingPage';
import { PaginationPage } from '@/components/Product/PageNumber';
import {ProductList} from '@/components/Product/ProductList';
import ProductCardSkeleton from '@/components/Ui/ProductCardSkeleton';
import { AppDispatch, RootState } from '@/store';
import {fetchProducts } from '@/store/slices/productSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function  AdminProducts() {

  const dispatch = useDispatch<AppDispatch>(); 
  const {products, wishlistproducts, loading } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch, currentPage]);

  const paginatedProducts = products.slice(
      (currentPage - 1) * 12,
      currentPage * 12
  );

  if (loading) return <LoadingPage />;

  return (
    <>
      <h2 className='fs-1 text-center p-4'>All Products</h2>
      <Link href="addProduct" className="btn btn-primary mb-3">Add Product</Link>
      {loading&&products.length===0?(
          <ProductCardSkeleton />
      ):(
          <ProductList allData={{data:paginatedProducts, results:0}} compare={wishlistproducts}/>
      )}
      <PaginationPage currentPage={currentPage} products={products} setCurrentPage={setCurrentPage}/>
    </>
  )
}
