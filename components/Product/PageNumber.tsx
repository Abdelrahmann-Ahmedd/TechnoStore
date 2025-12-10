"use client";
import { Product } from '@/models/Product';
import React, { Dispatch, SetStateAction } from 'react'

type PageNumberProps = {
    products: Product[];
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
}

const PageNumber: React.FC<PageNumberProps> = ({products,setCurrentPage,currentPage}) => {
    
    // Calculate total pages
    const totalPages = Math.ceil(products.length / 12);
    
    
    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                <button
                    className="page-link"
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
                </li>
            ))}
            </ul>
        </nav>
    )
}

export const PaginationPage = React.memo(PageNumber);