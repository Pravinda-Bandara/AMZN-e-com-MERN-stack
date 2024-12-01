import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";

interface OrderSummaryProps {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    onPay: () => void;
}

export function OrderSummary({
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    onPay,
}: OrderSummaryProps) {
    return (
        <Card className="rounded-lg mb-3">
            <Card.Body>
                <Card.Title className="mb-4 text-xl font-semibold">Order Summary</Card.Title>
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
                    {!isPaid && (
                        <ListGroup.Item className="pt-4 pb-3">
                            <div className="d-grid">
                                <Button
                                    type="button"
                                    onClick={onPay}
                                    className="customOrangeButton"
                                    size="lg"
                                >
                                    Confirm Payment
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
