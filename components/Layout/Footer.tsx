"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-body-tertiary text-black mt-5 py-4 border-top">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          {/* Left Section */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <p className="mb-0 fw-semibold">
              &copy; {new Date().getFullYear()} <span className="text-primary">MyStore</span>. All Rights Reserved.
            </p>
          </div>

          {/* Right Section */}
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-center justify-content-md-end gap-4 flex-wrap">
              <Link href="/about" className="text-black text-decoration-none fw-medium">
                About
              </Link>
              <Link href="/contact" className="text-black text-decoration-none fw-medium">
                Contact
              </Link>
              <Link href="/privacy" className="text-black text-decoration-none fw-medium">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
