import { Card, ListGroup, Button } from "react-bootstrap";

interface CartSummaryProps {
    cartItems: any[];
    checkoutHandler: () => void;
}

export function CartSummary({ cartItems, checkoutHandler }: CartSummaryProps) {
    const totalItems = cartItems.reduce((a, c) => a + c.quantity, 0);
    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

    return (
        <Card>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>
                            Subtotal ({totalItems} items) : ${totalPrice.toFixed(2)}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-grid">
                            <Button
                                type="button"
                                className="customOrangeButton"
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
