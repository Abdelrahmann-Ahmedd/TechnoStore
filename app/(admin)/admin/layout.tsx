"use client";
import AdminSidebar from "@/components/Layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "240px",
          padding: "30px",
          background: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <div className="container-fluid">
          {children}
        </div>
      </div>
    </div>
  );
}
