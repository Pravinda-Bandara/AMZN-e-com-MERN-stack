import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ProductListProps {
    products: {
        _id: string;
        name: string;
        price: number;
        category: string;
        brand: string;
    }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => onEdit(product._id)}
                            >
                                Edit
                            </Button>
                            &nbsp;
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => onDelete(product._id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
