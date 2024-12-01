import { Button, ListGroup, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartItem } from "../../../../types/CartItem";

interface CartItemListProps {
    cartItems: CartItem[];
    updateCartHandler: (item: CartItem, quantity: number) => void;
    removeItemHandler: (item: CartItem) => void;
}

export function CartItemList({ cartItems, updateCartHandler, removeItemHandler }: CartItemListProps) {
    return (
        <ListGroup className="rounded">
            {cartItems.map((item: CartItem) => (
                <ListGroup.Item
                    key={item._id}
                    className="d-flex flex-column flex-md-row align-items-center gap-3 py-3"
                >
                    {/* Product Image */}
                    <Image
                        src={item.image}
                        alt={item.name}
                        className="rounded thumbnail"
                        style={{ maxWidth: "100px", objectFit: "cover" }}
                    />
                    
                    {/* Product Name */}
                    <div className="flex-grow-1">
                        <Link to={`/product/${item.slug}`} className="text-decoration-none text-dark fw-bold">
                            {item.name}
                        </Link>
                    </div>
                    
                    {/* Quantity Control */}
                    <div className="d-flex align-items-center gap-2" style={{ minWidth: "120px" }}>
                        <Button
                            onClick={() => updateCartHandler(item, item.quantity - 1)}
                            variant="outline-secondary"
                            size="sm"
                            disabled={item.quantity === 1}
                            title="Decrease quantity"
                        >
                            −
                        </Button>
                        <span className="text-center fw-bold" style={{ width: "30px", textAlign: "center" }}>
                            {item.quantity}
                        </span>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCartHandler(item, item.quantity + 1)}
                            disabled={item.quantity === item.virtualCountInStock}
                            title="Increase quantity"
                        >
                            +
                        </Button>
                    </div>
                    
                    {/* Price */}
                    <div className="fw-bold" style={{ minWidth: "80px", textAlign: "left" }}>
                        ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                        onClick={() => removeItemHandler(item)}
                        variant="outline-danger"
                        size="sm"
                        title="Remove item"
                    >
                        Remove
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
