import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";

interface OrderSummaryProps {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    userInfo: any;
    onPay: () => void;
    onDeliver: () => void;
    loadingDeliver: boolean;
}

export function OrderSummary({
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    userInfo,
    onPay,
    onDeliver,
    loadingDeliver,
}: OrderSummaryProps) {
    return (
        <Card className="mb-3">
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
                            <Col><strong>Order Total</strong></Col>
                            <Col><strong>${totalPrice.toFixed(2)}</strong></Col>
                        </Row>
                        {!isPaid && (
                            <Button className="mt-3" onClick={onPay}>
                                Confirm Payment
                            </Button>
                        )}
                        {userInfo?.isAdmin && !isDelivered && isPaid && (
                            <Button
                                className="mt-3 mx-2"
                                onClick={onDeliver}
                                disabled={loadingDeliver}
                                variant="success" // Set the button color to green
                            >
                                {loadingDeliver ? "Delivering..." : "Confirm Delivery"}
                            </Button>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
