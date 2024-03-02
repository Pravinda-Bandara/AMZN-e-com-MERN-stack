import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox.tsx";
import MessageBox from "../components/MessageBox.tsx";
import { getError } from "../util.ts";
import { ApiError } from "../types/ApiError.ts";
import { useDeleteOrderMutation, useDeliverOrderMutation, useGetOrdersQuery } from "../hooks/orderHooks.ts";
import { toast } from "react-toastify";

export default function OrderListPage() {
    const navigate = useNavigate();
    const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
    const { mutateAsync: deleteOrderMutation } = useDeleteOrderMutation();
    const { mutateAsync: deliverOrderMutation } = useDeliverOrderMutation();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);
    const [orderIdToDeliver, setOrderIdToDeliver] = useState(null);

    const handleDeleteConfirmation = async (orderId: any) => {
        setOrderIdToDelete(orderId);
        setShowConfirmation(true);
    };

    const handleDeliverConfirmation = async (orderId: any) => {
        setOrderIdToDeliver(orderId);
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

    const handleDeliverOrder = async (orderId: any) => {
        try {
            await deliverOrderMutation(orderId);
            refetch();
            setShowConfirmation(false);
            toast.success("Order delivered successfully");
        } catch (error) {
            console.error("Error delivering order:", error);
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
                            <th>TOTAL ($)</th>
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
                                    <Button
                                        type="button"
                                        variant="info"
                                        onClick={() => navigate(`/order/${order._id}`)}
                                    >
                                        Details
                                    </Button>
                                    &nbsp;
                                    <Button
                                        className="mx-2"
                                        type="button"
                                        variant="danger"
                                        onClick={() => handleDeleteConfirmation(order._id)}
                                    >
                                        Delete
                                    </Button>
                                    &nbsp;
                                    {!order.isDelivered && order.isPaid? (
                                        <Button
                                            type="button"
                                            variant="success"
                                            onClick={() => handleDeliverConfirmation(order._id)}
                                        >
                                            Confirm Delivery
                                        </Button>
                                    ) : (
                                        <Button variant="success" disabled>
                                            Delivered
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {orderIdToDelete ? "Confirm Delete" : "Confirm Delivery"}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {orderIdToDelete
                                ? "Are you sure you want to delete this order?"
                                : "Are you sure you want to mark this order as delivered?"}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant={orderIdToDelete ? "danger" : "success"}
                                onClick={() => {
                                    if (orderIdToDelete) {
                                        handleDeleteOrder(orderIdToDelete);
                                    } else {
                                        handleDeliverOrder(orderIdToDeliver);
                                    }
                                }}
                            >
                                {orderIdToDelete ? "Delete" : "Confirm Delivery"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
}
