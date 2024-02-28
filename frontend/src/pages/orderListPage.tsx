import React, { useState } from "react";
import LoadingBox from "../components/LoadingBox.tsx";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox.tsx";
import { getError } from "../util.ts";
import { ApiError } from "../types/ApiError.ts";
import { useNavigate } from "react-router-dom";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../hooks/orderHooks.ts";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

export default function OrderListPage() {
    const navigate = useNavigate();
    const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
    const { mutateAsync: deleteOrderMutation } = useDeleteOrderMutation();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);

    const handleDeleteConfirmation = async (orderId: any) => {
        setOrderIdToDelete(orderId);
        setShowConfirmation(true);
    };

    const handleDeleteOrder = async (orderId: any) => {
        try {
            await deleteOrderMutation(orderId);
            refetch();
            setShowConfirmation(false);
            toast.success("Order deleted successfully");
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error(getError(error as ApiError));
        }
    };

    return (
        <div>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <h1>Orders</h1>
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
                            <th>USER</th>
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
                                <td>{order.user ? order.user.name : "DELETED USER"}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                                <td>
                                    <Button type="button" variant="light" onClick={() => navigate(`/order/${order._id}`)}>
                                        Details
                                    </Button>
                                    &nbsp;
                                    <Button className="mx-2" type="button" variant="danger" onClick={() => handleDeleteConfirmation(order._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

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
                </>
            )}
        </div>
    );
}
