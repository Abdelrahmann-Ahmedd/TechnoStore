"use client"

import { ProductList } from "@/components/Product/ProductList"
import ProductCardSkeleton from "@/components/Ui/ProductCardSkeleton"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setToken } from "@/store/slices/authSlice"
import { fetchWishlistProducts } from "@/store/slices/productSlice"
import { useEffect } from "react"
export default function WishListView() {

    const dispatch = useAppDispatch();
    const {wishlistproducts , wishlistLoading ,error} = useAppSelector((state)=> state.products);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || wishlistproducts.length > 0) return;

        dispatch(setToken(token));
        dispatch(fetchWishlistProducts());
    }, [dispatch, wishlistproducts.length]);




    if(wishlistproducts.length === 0 && !wishlistLoading){
        return (
            <section className="text-center mt-5">
                <h2>WishList is Empty</h2>
                <a className="btn btn-primary mt-3" href="/category">Add your WishList Now</a>
            </section>
        )
    }

    return (
        <section className="container">
            <h2 className="fs-1 mt-3 text-center">Wishlist</h2>
            {wishlistLoading?(
                <ProductCardSkeleton />
            ):(
                <ProductList allData={{data:wishlistproducts, results: 0 }} compare={wishlistproducts} />
            )}
        </section>
    )
}
