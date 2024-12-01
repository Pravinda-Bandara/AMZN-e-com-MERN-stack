import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface OrderItemsProps {
    items: any[];
}

export function OrderItems({ items }: OrderItemsProps) {
    return (
        <Card className="rounded-lg mb-3">
            <Card.Body>
                <Card.Title className="mb-4 text-xl font-semibold">Items</Card.Title>
                <ListGroup variant="flush">
                    {items.map((item) => (
                        <ListGroup.Item key={item._id} className="py-3">
                            <Row className="align-items-center">
                                {/* Image and Product Name */}
                                <Col md={6} className="d-flex align-items-center space-x-4">
                                    <img
                                        src={`../${item.image}`}
                                        alt={item.name}
                                        className="img-fluid rounded-lg w-24 h-24 object-cover"
                                    />
                                    <Link
                                        to={`/product/${item.slug}`}
                                        className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </Col>

                                {/* Quantity and Price in Horizontal Layout */}
                                <Col md={6} className="flex justify-between">
                                    {/* Quantity Section */}
                                    <div className=" flex align-items-center">
                                        <div className="text-sm font-semibold text-gray-700">Quantity :</div>
                                        <div className="text-sm font-semibold text-gray-700">{item.quantity}</div>
                                    </div>

                                    {/* Price Section */}
                                    <div className="flex align-items-center">
                                        <div className="text-sm font-semibold text-gray-700">Price :</div>
                                        <div className="text-sm font-semibold text-gray-700">${item.price.toFixed(2)}</div>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
