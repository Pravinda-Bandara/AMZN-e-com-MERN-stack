import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAdminProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../hooks/productHooks.ts';
import { toast } from 'react-toastify';
import { getError } from '../../util.ts';
import { ApiError } from '../../types/ApiError.ts';
import { Button, Row, Col } from 'react-bootstrap';
import LoadingBox from '../../components/LoadingBox.tsx';
import MessageBox from '../../components/MessageBox.tsx';
import { ProductList } from './components/ProductList.tsx';
import { Pagination } from './components/Pagination.tsx';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal.tsx';

export default function ProductListPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = Number(sp.get('page') || 1);

    const { data, isLoading, error, refetch } = useGetAdminProductsQuery(page);

    const { mutateAsync: createProduct, isPending: loadingCreate } = useCreateProductMutation();
    const { mutateAsync: deleteProduct, isPending: loadingDelete } = useDeleteProductMutation();

    // State for the delete confirmation modal
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

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
                    <Button type="button" onClick={createHandler}>
                        Create Product
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <LoadingBox></LoadingBox>}

            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <>
                    {/* Product List */}
                    <ProductList
                        products={data!.products}
                        onEdit={(id) => navigate(`/admin/product/${id}`)}
                        onDelete={handleDeleteConfirmation}
                    />

                    {/* Pagination */}
                    <Pagination pages={data!.pages} currentPage={data!.page} />

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationModal
                        show={showConfirmation}
                        onHide={() => setShowConfirmation(false)}
                        onDelete={() => handleDeleteProduct(productIdToDelete!)}
                    />
                </>
            )}
        </div>
    );
}
