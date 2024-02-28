import { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom';
import { useDeleteOrderMutation, useGetOrderHistoryQuery } from '../hooks/orderHooks.ts';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox.tsx';
import React from 'react';
import { getError } from '../util.ts';
import { ApiError } from '../types/ApiError.ts';
import MessageBox from '../components/MessageBox.tsx';
import { Button, Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap

import { toast } from 'react-toastify';

export default function OrderHistoryPage() {
    const navigate = useNavigate();
    const { data: orders, isLoading, error, refetch } = useGetOrderHistoryQuery();
    const { mutateAsync: deleteOrderMutation } = useDeleteOrderMutation();
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control the visibility of the confirmation modal
    const [orderIdToDelete, setOrderIdToDelete] = useState(null); // State to store the id of the order to be deleted

    const handleDeleteConfirmation = async (orderId:any) => {
        setOrderIdToDelete(orderId);
        setShowConfirmation(true);
    };

    const handleDeleteOrder = async (orderId:any) => {
        try {
            await deleteOrderMutation(orderId);
            refetch();
            setShowConfirmation(false); // Close the confirmation modal after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order. Please try again later.');
        }
    };

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>

            <h1>Order History</h1>
            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders!.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                            <td>
                                <Button variant="secondary" type="button" onClick={() => navigate(`/order/${order._id}`)}>
                                    Details
                                </Button>
                                <Button className="mx-2" type="button" variant="danger" onClick={() => handleDeleteConfirmation(order._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {/* Confirmation Modal */}
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteOrder(orderIdToDelete)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
