import React from "react";
import { ListGroup, Row, Col, Button, Card } from "react-bootstrap";
import LoadingBox from "../../../../components/LoadingBox.tsx";

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
        <Card className="border-0">
            <Card.Body className="border-1 rounded-lg">
                <Card.Title className="mb-4 text-xl font-semibold text-center">Order Summary</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                        <Row className="w-100">
                            <Col className="text-gray-700">Items</Col>
                            <Col className="text-end text-gray-900">${itemsPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                        <Row className="w-100">
                            <Col className="text-gray-700">Shipping</Col>
                            <Col className="text-end text-gray-900">${shippingPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                        <Row className="w-100">
                            <Col className="text-gray-700">Tax</Col>
                            <Col className="text-end text-gray-900">${taxPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-top-0">
                        <Row className="w-100">
                            <Col>
                                <strong className="text-gray-900">Order Total</strong>
                            </Col>
                            <Col className="text-end">
                                <strong className="text-xl text-gray-900">${totalPrice.toFixed(2)}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="pt-4 pb-3">
                        <div className="d-grid">
                            <Button
                                type="button"
                                onClick={onPlaceOrder}
                                disabled={disableButton || isPending}
                                className="customOrangeButton"
                            >
                                {isPending ? "Placing Order..." : "Place Order"}
                            </Button>
                        </div>
                        {isPending && <LoadingBox />}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
