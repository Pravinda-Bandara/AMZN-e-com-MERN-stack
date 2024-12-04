import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../../components/LoadingBox.tsx";
import MessageBox from "../../../components/MessageBox.tsx";
import { getError } from "../../../util.ts";
import { ApiError } from "../../../types/ApiError.ts";
import { useDeleteOrderMutation, useDeliverOrderMutation, useGetOrdersQuery } from "../../../hooks/orderHooks.ts";
import { toast } from "react-toastify";
import { OrderTable } from "./components/OrderTable";
import { ConfirmationModal } from "./components/ConfirmationModal";

export default function OrderListPage() {
    const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
    const { mutateAsync: deleteOrderMutation } = useDeleteOrderMutation();
    const { mutateAsync: deliverOrderMutation } = useDeliverOrderMutation();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [actionType, setActionType] = useState<"delete" | "deliver">("delete");
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

    const handleDeleteConfirmation = (orderId: string) => {
        setCurrentOrderId(orderId);
        setActionType("delete");
        setShowConfirmation(true);
    };

    const handleDeliverConfirmation = (orderId: string) => {
        setCurrentOrderId(orderId);
        setActionType("deliver");
        setShowConfirmation(true);
    };

    const handleConfirmAction = async () => {
        try {
            if (actionType === "delete") {
                await deleteOrderMutation(currentOrderId);
                toast.success("Order deleted successfully");
            } else {
                await deliverOrderMutation(currentOrderId);
                toast.success("Order delivered successfully");
            }
            refetch();
            setShowConfirmation(false);
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    };

    return (
        <div>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <h1 className="h3">Orders</h1>
            {isLoading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <OrderTable
                    orders={orders}
                    handleDeleteConfirmation={handleDeleteConfirmation}
                    handleDeliverConfirmation={handleDeliverConfirmation}
                />
            )}
            <ConfirmationModal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={handleConfirmAction}
                actionType={actionType}
            />
        </div>
    );
}
