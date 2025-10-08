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
        <aside className="bg-body-tertiary text-black position-fixed start-0 h-100 z-0  p-3" style={{ width: "250px" }}>
            <ul className="list-unstyled">
                {links.map((link) => (
                    <li key={link.href} className="mb-3">
                        <Link
                            href={link.href}
                            className={`d-block text-decoration-none px-3 py-2 rounded ${
                                pathname === link.href ? "bg-primary text-black" : "text-black"
                            }`}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
