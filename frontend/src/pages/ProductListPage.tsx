import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetAdminProdcutsQuery,
} from '../hooks/productHooks.ts';
import { toast } from 'react-toastify';
import { getError } from '../util.ts';
import { ApiError } from '../types/ApiError.ts';
import { Button, Col, Row, Modal } from 'react-bootstrap'; // Include Modal from react-bootstrap
import React, { useState } from 'react'; // Import useState from react
import LoadingBox from '../components/LoadingBox.tsx';
import MessageBox from '../components/MessageBox.tsx';

export default function ProductListPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = Number(sp.get('page') || 1);

    const { data, isLoading, error, refetch } = useGetAdminProdcutsQuery(page);

    const { mutateAsync: createProduct, isPending: loadingCreate } = useCreateProductMutation();

    const createHandler = async () => {
        if (window.confirm('Are you sure to create?')) {
            try {
                const data = await createProduct();
                refetch();
                toast.success('Product created successfully');
                navigate(`/admin/product/${data.product._id}`);
            } catch (err) {
                toast.error(getError(err as ApiError));
            }
        }
    };

    const { mutateAsync: deleteProduct, isPending: loadingDelete } = useDeleteProductMutation();

    const deleteHandler = async (id: string) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                deleteProduct(id);
                refetch();
                toast.success('Product deleted successfully');
            } catch (err) {
                toast.error(getError(err as ApiError));
            }
        }
    };

    // State and functions for Delete Confirmation Modal
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

    const handleDeleteConfirmation = (productId: string) => {
        setProductIdToDelete(productId);
        setShowConfirmation(true);
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            await deleteProduct(productId);
            refetch();
            setShowConfirmation(false);
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error(getError(error as ApiError));
        }
    };

    return (
        <div>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="col text-end">
                    <div>
                        <Button type="button" onClick={createHandler}>
                            Create Product
                        </Button>
                    </div>
                </Col>
            </Row>

            {loadingCreate && <LoadingBox></LoadingBox>}

            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <>
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
                        {data!.products.map((product) => (
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
                                        onClick={() => navigate(`/admin/product/${product._id}`)}
                                    >
                                        Edit
                                    </Button>
                                    &nbsp;
                                    <Button
                                        type="button"
                                        variant="danger"
                                        onClick={() => handleDeleteConfirmation(product._id!)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div >
                        {[...Array(data!.pages).keys()].map((x) => (
                            <Link
                                className={x + 1 === Number(data!.page) ? 'btn text-bold' : 'btn'}
                                key={x + 1}
                                to={`/admin/products?page=${x + 1}`}
                            >
                                <Button>{x + 1}</Button>
                            </Link>
                        ))}
                    </div>

                    {/* Delete Confirmation Modal */}
                    <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    handleDeleteProduct(productIdToDelete!);
                                }}
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
}
