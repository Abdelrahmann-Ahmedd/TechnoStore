import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

// Metadata (SEO)
export const metadata: Metadata = {
  title: {
    default: "MyStore | Your Trusted Online Shop",
    template: "%s | MyStore",
  },
  description:
    "Shop your favorite products at MyStore — your trusted destination for electronics, fashion, and more.",
  keywords: ["ecommerce", "next.js", "shopping", "MyStore"],
  authors: [{ name: "Abdelrahman Ahmed" }],
  openGraph: {
    title: "MyStore",
    description: "Your trusted e-commerce platform for modern online shopping.",
    type: "website",
    locale: "en_US",
    url: "https://mystore.com",
    siteName: "MyStore",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-light text-dark min-vh-100">
        {children}
      </body>
    </html>
  );
}
