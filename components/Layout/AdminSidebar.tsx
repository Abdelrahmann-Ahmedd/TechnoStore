"use client";
import React from "react";
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
    { name: "Users", href: "/admin/user" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside
        className="border-end bg-white position-fixed h-100 p-3 pt-5 shadow-sm"
        style={{ width: "240px", top: 0, left: 0 }}
        >
        <h5 className="fw-bold fs-2 mb-4 text-primary ps-3">Dashboard</h5>

        <ul className="list-unstyled">
            {links.map((link) => {
            const isActive = pathname === link.href;

            return (
                <li key={link.href} className="mb-2">
                <Link
                    href={link.href}
                    className={`d-block px-3 py-2 rounded-3 text-decoration-none 
                    ${isActive ? "bg-primary text-white fw-semibold" : "text-dark"} 
                    `}
                    style={{
                    transition: "0.2s",
                    }}
                >
                    {link.name}
                </Link>
                </li>
            );
            })}
        </ul>
        </aside>
    );
}
