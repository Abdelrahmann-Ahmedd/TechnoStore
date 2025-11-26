import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ClientStoreProvider from "@/components/ClientSideProvider";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-light text-dark">
                <ClientStoreProvider>
                <header className="sticky-top shadow-sm bg-white">
                    <Navbar />
                </header>

                <main>{children}</main>

                <Footer />

                <Toaster position="top-center" />
                </ClientStoreProvider>
            </body>
        </html>
    );
}
