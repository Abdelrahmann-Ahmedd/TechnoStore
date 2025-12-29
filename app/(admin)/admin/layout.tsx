"use client";

import AdminSidebar from "@/components/Layout/AdminSidebar";
import ClientStoreProvider from "@/components/ClientSideProvider";
import "@/components/Chart/ChartSetup";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex" style={{ overflowX: "hidden" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <ClientStoreProvider>
        <main
          className="flex-grow-1"
          style={{
            padding: "10px",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            overflowX: "hidden", // prevent horizontal scroll
          }}
        >
          <div className="container">{children}</div>
        </main>
      </ClientStoreProvider>

      <style jsx>{`
        @media (min-width: 768px) {
          main {
            margin-left: 240px; /* sidebar width */
          }
        }

        @media (max-width: 767.98px) {
          main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
