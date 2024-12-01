import React from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import { Product } from "../../../../types/Product";

interface ProductActionsProps {
    product: Product;
    addToCartHandler: () => void;
}

export function ProductActions({ product, addToCartHandler }: ProductActionsProps) {
    return (
        <Card className="border m-0 p-0">
            <Card.Body>
                <ListGroup variant="flush">
                    {/* Product Price */}
                    <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Price:</strong> <span>${product.price}</span>
                    </ListGroup.Item>

                    {/* Stock Status */}
                    <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Status:</strong>
                        {product.virtualCountInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                        ) : (
                            <Badge bg="danger">Out of Stock</Badge>
                        )}
                    </ListGroup.Item>

                    {/* Add to Cart Button */}
                    {product.virtualCountInStock > 0 && (
                        <ListGroup.Item>
                            <Button
                                className="w-100 customOrangeButton"
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
