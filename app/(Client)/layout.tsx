"use client";

import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ClientStoreProvider from "@/components/ClientSideProvider";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/store/hooks";
import LoadingPage from "@/components/Layout/LoadingPage";
import LayoutContent from "./LayoutContent/LayoutContent";

export default function ClientLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {


    return (
        <ClientStoreProvider>
            <LayoutContent>
                {children}
            </LayoutContent>
            <Toaster position="top-center" />
        </ClientStoreProvider>
    );
}
