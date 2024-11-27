import React from "react";
import { ListGroup, Row, Col, Button, Card } from "react-bootstrap";
import LoadingBox from "../../../components/LoadingBox.tsx";

interface OrderSummaryProps {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    onPlaceOrder: () => void;
    isPending: boolean;
    disableButton: boolean;
}

export function OrderSummary({
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    onPlaceOrder,
    isPending,
    disableButton,
}: OrderSummaryProps) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${itemsPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${shippingPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${taxPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <strong>Order Total</strong>
                            </Col>
                            <Col>
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-grid">
                            <Button
                                type="button"
                                onClick={onPlaceOrder}
                                disabled={disableButton || isPending}
                            >
                                Place Order
                            </Button>
                        </div>
                        {isPending && <LoadingBox />}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
