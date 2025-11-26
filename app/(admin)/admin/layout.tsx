"use client";

import AdminSidebar from "@/components/Layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <main
        className="flex-grow-1"
        style={{
          marginLeft: "240px",
          padding: "30px",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="container-fluid">{children}</div>
      </main>
    </div>
  );
}
