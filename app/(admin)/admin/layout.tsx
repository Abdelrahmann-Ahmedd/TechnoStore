"use client";

import AdminSidebar from "@/components/Layout/AdminSidebar";
import "@/components/Chart/ChartSetup";
import ClientStoreProvider from "@/components/ClientSideProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
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
          }}
        >
          <div className="container-fluid">{children}</div>
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
            margin-left: 0; /* full width on small screens */
          }
        }
      `}</style>
    </div>
  );
}
