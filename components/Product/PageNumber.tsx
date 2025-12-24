"use client";
import { Product } from '@/models/Product';
import React, { Dispatch, SetStateAction, useCallback } from 'react'

type PageNumberProps = {
    products: Product[];
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
}

const PageNumber: React.FC<PageNumberProps> = ({products,setCurrentPage,currentPage}) => {
    
    // Calculate total pages
    const totalPages = Math.ceil(products.length / 12);
    
    const handleCurrentPage = useCallback((page: number) => setCurrentPage(page)
    ,[setCurrentPage])

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center">
            {new Array(totalPages).fill(0).map((_, i) => {
            const page = i + 1;
            return (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                <button className="page-link" onClick={() => handleCurrentPage(page)}>
                {page}
                </button>
            </li>
            );
            })}
            </ul>
        </nav>
    )
}

export const PaginationPage = React.memo(PageNumber);