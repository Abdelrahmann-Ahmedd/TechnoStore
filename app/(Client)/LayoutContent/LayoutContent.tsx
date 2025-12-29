"use client";

import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import LoadingPage from "@/components/Layout/LoadingPage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
    fetchBrands,
    fetchCategories,
    fetchProducts,
} from "@/store/slices/productSlice";
import { setToken } from "@/store/slices/authSlice";

export default function LayoutContent({
    children,
    }: {
    children: React.ReactNode;
    }) {
    const dispatch = useAppDispatch();
    const { initialLoaded } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (!initialLoaded) {
            dispatch(fetchBrands());
            dispatch(fetchCategories());
            dispatch(fetchProducts());
            const token = localStorage.getItem("token");
            if (token) dispatch(setToken(token));
        }
    }, [dispatch, initialLoaded]);



    return (
        <>
        <header className="sticky-top shadow-sm bg-white">
            <Navbar />
        </header>

        <main style={{ minHeight: "calc(100vh - 72px - 160px)" }}>
            {initialLoaded ? children : <LoadingPage />}
        </main>

        <Footer />
        </>
    );
}
