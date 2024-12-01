import React, { useContext } from "react";
import { Store } from "../../../Store.tsx";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from "../../../hooks/orderHooks.ts";
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
    const { mutateAsync: deliverOrder, isPending: loadingDeliver } = useDeliverOrderMutation();

    const confirmHandler = async () => {
        await payOrder({ orderId: orderId! });
        refetch();
        toast.success("Order is paid");
    };

    const deliverHandler = async () => {
        await deliverOrder(orderId!);
        refetch();
        toast.success("Order is delivered");
    };

    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{getError(error)}</MessageBox>
    ) : (
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className="my-3">Order {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ShippingDetails 
                        shippingAddress={order?.shippingAddress}
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
                        isDelivered={order.isDelivered}
                        userInfo={userInfo}
                        onPay={confirmHandler}
                        onDeliver={deliverHandler}
                        loadingDeliver={loadingDeliver}
                    />
                </Col>
            </Row>
        </div>
    );
}
