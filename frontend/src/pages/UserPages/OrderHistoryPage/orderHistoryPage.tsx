import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import LoadingBox from "../../../components/LoadingBox.tsx";
import MessageBox from "../../../components/MessageBox.tsx";
import { useDeleteOrderMutation, useGetOrderHistoryQuery } from "../../../hooks/orderHooks.ts";
import { ApiError } from "../../../types/ApiError.ts";
import { getError } from "../../../util.ts";
import { OrderTable } from "./components/OrderTable";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";

export default function OrderListPage() {
    const { data: orders, isLoading, error, refetch } = useGetOrderHistoryQuery();
    const { mutateAsync: deleteOrderMutation } = useDeleteOrderMutation();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState<string | null>(null);

    const handleDeleteConfirmation = (orderId: string) => {
        setOrderIdToDelete(orderId);
        setShowConfirmation(true);
    };

    const handleDeleteOrder = async () => {
        if (!orderIdToDelete) return;
        try {
            await deleteOrderMutation(orderIdToDelete);
            refetch();
            setShowConfirmation(false);
            toast.success("Order deleted successfully");
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error(getError(error as ApiError));
        }
    };

    return (
        <div className="mx-4">
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <h1 className="h3">Orders</h1>
            {isLoading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">
                    {getError(error as unknown as ApiError)}
                </MessageBox>
            ) : (
                <OrderTable orders={orders!} onDelete={handleDeleteConfirmation} />
            )}
            <DeleteConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onDelete={handleDeleteOrder}
            />
        </div>
    );
}
