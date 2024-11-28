import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface OrderTableProps {
    orders: any[];
    onDelete: (orderId: string) => void;
}

export function OrderTable({ orders, onDelete }: OrderTableProps) {
    const navigate = useNavigate();

    return (
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
                {orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                        <td>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => navigate(`/order/${order._id}`)}
                            >
                                Details
                            </Button>
                            {!order.isPaid && (
                                <Button
                                    className="mx-2"
                                    type="button"
                                    variant="danger"
                                    onClick={() => onDelete(order._id)}
                                >
                                    Delete
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
