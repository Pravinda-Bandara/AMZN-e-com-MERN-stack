import { Button, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartItem } from "../../../types/CartItem";

interface CartItemListProps {
    cartItems: CartItem[];
    updateCartHandler: (item: CartItem, quantity: number) => void;
    removeItemHandler: (item: CartItem) => void;
}

export function CartItemList({ cartItems, updateCartHandler, removeItemHandler }: CartItemListProps) {
    return (
        <ListGroup>
            {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                        <Col md={4}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid rounded thumbnail"
                            />{" "}
                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                            <Button
                                onClick={() => updateCartHandler(item, item.quantity - 1)}
                                variant="light"
                                disabled={item.quantity === 1}
                            >
                                <i className="fas fa-minus-circle"></i>
                            </Button>{" "}
                            <span>{item.quantity}</span>
                            <Button
                                variant="light"
                                onClick={() => updateCartHandler(item, item.quantity + 1)}
                                disabled={item.quantity === item.countInStock}
                            >
                                <i className="fas fa-plus-circle"></i>
                            </Button>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                        <Col md={2}>
                            <Button
                                onClick={() => removeItemHandler(item)}
                                variant="light"
                            >
                                <i className="fas fa-trash"></i>
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
