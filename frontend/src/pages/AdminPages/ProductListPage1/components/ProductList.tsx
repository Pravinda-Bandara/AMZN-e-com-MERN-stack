import { Button, Col, Row, Table, Modal } from "react-bootstrap";
import { Product } from "../../../../types/Product.ts";
import { NoContent } from "../../../../components/NoContent.tsx";
import { useDeleteProductMutation } from "../../../../hooks/productHooks.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ProductListProps {
    products: Product[];
    page: number;
    pages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function ProductList({ products, page, pages, setPage }: ProductListProps) {
    const navigate = useNavigate();

    // State to handle the confirmation modal for product deletion
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    // Delete mutation hook
    const { mutate: deleteProduct } = useDeleteProductMutation();

    const handleDeleteProduct = (productId: string) => {
        setProductToDelete(productId);
        setShowDeleteModal(true);
    };

    const confirmDeleteProduct = () => {
        if (productToDelete) {
            deleteProduct(productToDelete);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="d-flex flex-column justify-between min-h-[500px]">
            
            <div className="flex-grow-1">
                {products.length === 0 ? (
                    <NoContent
                        title="No Products Found"
                        message="We couldn't find any products. You can add a new product below."
                    />
                ) : (
                    <Table striped bordered hover responsive>
                        <thead className="text-center">
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Virtual Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {products.map((product) => (
                                <tr key={product.slug}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.realCountInStock}</td>
                                    <td>{product.virtualCountInStock}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => navigate(`/admin/product/${product.slug}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteProduct(product._id!)}
                                            className="ml-2"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Pagination */}
                <Button
                    variant="light"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {pages}
                </span>
                <Button
                    variant="light"
                    onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                    disabled={page === pages}
                >
                    Next
                </Button>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
