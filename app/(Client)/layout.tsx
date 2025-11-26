"use client";

import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ClientStoreProvider from "@/components/ClientSideProvider";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <ClientStoreProvider>
        <header className="sticky-top shadow-sm bg-white">
            <Navbar />
        </header>

        <main>{children}</main>

        <Footer />
        <Toaster position="top-center" />
        </ClientStoreProvider>
    );
}
