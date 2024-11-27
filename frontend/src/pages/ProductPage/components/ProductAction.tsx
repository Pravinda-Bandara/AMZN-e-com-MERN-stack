import { Badge, Button, Card, ListGroup, Row, Col } from "react-bootstrap";

interface ProductActionsProps {
    product: any;
    addToCartHandler: () => void;
}

export function ProductActions({ product, addToCartHandler }: ProductActionsProps) {
    return (
        <Col md={3}>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>${product.price}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? (
                                        <Badge bg="success">In Stock</Badge>
                                    ) : (
                                        <Badge bg="danger">Unavailable</Badge>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button onClick={addToCartHandler} variant="primary">Add to Cart</Button>
                                </div>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}
