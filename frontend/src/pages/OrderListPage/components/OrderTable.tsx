import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface OrderTableProps {
    orders: any[];
    handleDeleteConfirmation: (orderId: string) => void;
    handleDeliverConfirmation: (orderId: string) => void;
}

export function OrderTable({ orders, handleDeleteConfirmation, handleDeliverConfirmation }: OrderTableProps) {
    const navigate = useNavigate();

    return (
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
                                type="button"
                                variant="info"
                                onClick={() => navigate(`/order/${order._id}`)}
                            >
                                Details
                            </Button>
                            &nbsp;
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => handleDeleteConfirmation(order._id)}
                            >
                                Delete
                            </Button>
                            &nbsp;
                            {!order.isDelivered && order.isPaid ? (
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
    );
}
