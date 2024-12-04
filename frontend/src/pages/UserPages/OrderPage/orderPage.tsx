import React, { useContext } from "react";
import { Store } from "../../../Store.tsx";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, usePayOrderMutation } from "../../../hooks/orderHooks.ts";
import LoadingBox from "../../../components/LoadingBox.tsx";
import MessageBox from "../../../components/MessageBox.tsx";
import { getError } from "../../../util.ts";
import { Helmet } from "react-helmet-async";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { ShippingDetails } from "./components/ShippingDetails";
import { PaymentDetails } from "./components/PaymentDetails";
import { OrderItems } from "./components/OrderItems";
import { OrderSummary } from "./components/OrderSummury.tsx";

export default function OrderPage() {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const { id: orderId } = useParams();
    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId!);
    const { mutateAsync: payOrder } = usePayOrderMutation();

    const confirmHandler = async () => {
        await payOrder({ orderId: orderId! });
        refetch();
        toast.success("Order is paid");
    };

    if (isLoading) {
        return <LoadingBox />;
    }

    if (error) {
        return <MessageBox variant="danger">{getError(error)}</MessageBox>;
    }

    if (!order) {
        return <MessageBox variant="danger">Order not found</MessageBox>;
    }

    return (
        <div className="mx-3">
            <Helmet>
                <title>Order Status</title>
            </Helmet>
            <h1 className="my-3 h3 mx-3">Order Status</h1>
            <Row className="mx-3">
                <Col className="p-0" md={8}>
                    <ShippingDetails 
                        shippingAddress={order.shippingAddress}
                        isDelivered={order.isDelivered}
                        deliveredAt={order.deliveredAt}
                    />
                    <PaymentDetails 
                        paymentMethod={order.paymentMethod}
                        isPaid={order.isPaid}
                        paidAt={order.paidAt}
                    />
                    <OrderItems items={order.orderItems} />
                </Col>
                <Col md={4}>
                    <OrderSummary
                        itemsPrice={order.itemsPrice}
                        shippingPrice={order.shippingPrice}
                        taxPrice={order.taxPrice}
                        totalPrice={order.totalPrice}
                        isPaid={order.isPaid}
                        onPay={confirmHandler}
                    />
                </Col>
            </Row>
        </div>
    );
}
