import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface OrderTableProps {
    orders: any[];
    handleDeleteConfirmation: (orderId: string) => void;
    handleDeliverConfirmation: (orderId: string) => void;
}

export function OrderTable({
    orders,
    handleDeleteConfirmation,
    handleDeliverConfirmation,
}: OrderTableProps) {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-between min-vh-100 ">
            <div className="flex-grow-1">
                {orders.length === 0 ? (
                    <p>No Orders Found</p>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead className="text-center">
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total ($)</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user ? order.user.name : "DELETED USER"}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            onClick={() => navigate(`/admin/order/${order._id}`)}
                                        >
                                            Details
                                        </Button>
                                        &nbsp;
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteConfirmation(order._id)}
                                        >
                                            Delete
                                        </Button>
                                        &nbsp;
                                        {!order.isDelivered && order.isPaid ? (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleDeliverConfirmation(order._id)}
                                            >
                                                Confirm Delivery
                                            </Button>
                                        ) : (
                                            <Button variant="success" size="sm" disabled>
                                                Delivered
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* Create New Order Button (if needed) */}
            <Button variant="primary" className="mt-3">
                Create New Order
            </Button>
        </div>
    );
}
