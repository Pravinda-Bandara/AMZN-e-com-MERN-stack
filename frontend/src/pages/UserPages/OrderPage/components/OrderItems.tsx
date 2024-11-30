import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface OrderItemsProps {
    items: any[];
}

export function OrderItems({ items }: OrderItemsProps) {
    
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                    {items.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <img
                                        src={`../${item.image}`}
                                        alt={item.name}
                                        className="img-fluid rounded thumbnail"
                                    />
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>{item.quantity}</Col>
                                <Col md={3}>${item.price}</Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
