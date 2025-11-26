import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

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
  viewport:"width=device-width, initial-scale=1"
};

// Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-light text-dark d-flex flex-column min-vh-100`}
        suppressHydrationWarning
      >
      {children}
      </body>
    </html>
  );
}
