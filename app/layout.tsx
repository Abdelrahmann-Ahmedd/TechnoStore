import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ClientStoreProvider from "@/components/ClientSideProvider";
import { Toaster } from "react-hot-toast";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: "MyStore | Your Trusted Online Shop",
    template: "%s | MyStore",
  },
  description:
    "Shop your favorite products at MyStore — your trusted destination for electronics, fashion, and more. Fast checkout and secure payments.",
  keywords: [
    "ecommerce",
    "next.js store",
    "online shopping",
    "react ecommerce",
    "MyStore",
  ],
  authors: [{ name: "Abdelrahman Ahmed" }],
  openGraph: {
    title: "MyStore",
    description:
      "Your trusted e-commerce platform for modern online shopping.",
    type: "website",
    locale: "en_US",
    url: "https://mystore.com",
    siteName: "MyStore",
  },
  icons: {
    icon: "/favicon.ico",
  },
  viewport:"width=device-width, initial-scale=1.0"
};

// Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Meta for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-light text-dark d-flex flex-column min-vh-100`}
        suppressHydrationWarning
      >
        <ClientStoreProvider>
          {/* Navbar */}
          <header className="sticky-top shadow-sm bg-white">
            <Navbar />
          </header>

          {/* Main Content */}
          <main className="flex-grow-1">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Toast Notifications */}
          <Toaster position="top-center" reverseOrder={false} />
        </ClientStoreProvider>
      </body>
    </html>
  );
}
