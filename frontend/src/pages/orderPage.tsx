import React, { useContext } from "react";
import { Store } from "../Store.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from "../hooks/orderHooks.ts";
import LoadingBox from "../components/LoadingBox.tsx";
import MessageBox from "../components/MessageBox.tsx";
import { getError } from "../util.ts";
import { ApiError } from "../types/ApiError.ts";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";

export default function OrderPage() {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;

    const navigate = useNavigate();

    const {
        data: order,
        isLoading,
        error,
        refetch,
    } = useGetOrderDetailsQuery(orderId!);

    const { mutateAsync: payOrder, isPending: loadingPay } = usePayOrderMutation();
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
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !order ? (
        <MessageBox variant="danger">Order Not Found</MessageBox>
    ) : (
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className="my-3">Order {orderId}</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {order!.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {order.shippingAddress.address},
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                ,{order.shippingAddress.country}
                            </Card.Text>
                            {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {new Date(order.deliveredAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} on {new Date(order.deliveredAt).toLocaleDateString()}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="warning">Not Delivered</MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {order.paymentMethod}
                            </Card.Text>
                            {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {new Date(order.paidAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} on {new Date(order.paidAt).toLocaleDateString()}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="warning">Not Paid</MessageBox>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded thumbnail"
                                                ></img>{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>${item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong> Order Total</strong>
                                        </Col>
                                        <Col>
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                    {!order.isPaid && (
                                        <Button className="mt-3" onClick={confirmHandler}>
                                            Confirm Payment
                                        </Button>
                                    ) }
                                    {userInfo?.isAdmin && !order.isDelivered && order.isPaid && (
                                        <Button
                                            className="mt-3 mx-2"
                                            onClick={deliverHandler}
                                            disabled={loadingDeliver}
                                        >
                                            {loadingDeliver ? "Delivering..." : "Confirm Delivery"}
                                        </Button>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
