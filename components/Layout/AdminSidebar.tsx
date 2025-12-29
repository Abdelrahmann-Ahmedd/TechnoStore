"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLink = {
    name: string;
    href: string;
};

const links: SidebarLink[] = [
    { name: "Dashboard", href: "/admin" },
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/order" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        {/* Hamburger for small screens */}
        <button
            className="btn btn-primary d-md-none position-fixed top-0 start-0 m-3 z-50"
            onClick={() => setIsOpen(!isOpen)}
        >
            ☰
        </button>

        {/* Sidebar */}
        <aside
            className="border-end bg-white position-fixed h-100 shadow-sm p-3 pt-5 d-flex flex-column"
            style={{
            width: "240px",
            top: 0,
            left: 0,
            zIndex: 1000,
            transition: "transform 0.3s ease-in-out",
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            minWidth: 0, // fix flex shrink issue
            }}
        >
            <Link href="/">
            <h1 className="fw-bold fs-3 mb-4 text-primary ps-3">Techno Store</h1>
            </Link>
            <ul className="list-unstyled flex-grow-1">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                <li key={link.href} className="mb-2">
                    <Link
                    href={link.href}
                    className={`d-block px-3 py-2 rounded-3 text-decoration-none ${
                        isActive ? "bg-primary text-white fw-semibold" : "text-dark"
                    }`}
                    style={{ transition: "0.2s" }}
                    onClick={() => setIsOpen(false)}
                    >
                    {link.name}
                    </Link>
                </li>
                );
            })}
            </ul>
        </aside>

        {/* Overlay for small screens */}
        {isOpen && (
            <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-md-none"
            style={{ zIndex: 500 }}
            onClick={() => setIsOpen(false)}
            />
        )}

        <style jsx>{`
            @media (min-width: 768px) {
            aside {
                transform: translateX(0) !important;
            }
            }
        `}</style>
        </>
    );
}
