import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Row, Col } from "react-bootstrap";

interface OrderItemsProps {
    cartItems: {
        _id: string;
        name: string;
        image: string;
        slug: string;
        quantity: number;
        price: number;
    }[];
}

export function OrderItems({ cartItems }: OrderItemsProps) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded thumbnail"
                                    ></img>{" "}
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
                <Link to="/cart">Edit</Link>
            </Card.Body>
        </Card>
    );
}
