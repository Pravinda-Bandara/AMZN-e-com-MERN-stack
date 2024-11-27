import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

interface PaginationProps {
    pages: number;
    currentPage: number;
}

export function Pagination({ pages, currentPage }: PaginationProps) {
    return (
        <div>
            {[...Array(pages).keys()].map((x) => (
                <Link
                    className={x + 1 === currentPage ? 'btn text-bold' : 'btn'}
                    key={x + 1}
                    to={`/admin/products?page=${x + 1}`}
                >
                    <Button>{x + 1}</Button>
                </Link>
            ))}
        </div>
    );
}
