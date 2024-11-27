import { ListGroup, Row, Col } from "react-bootstrap";
import Rating from "../../../components/Rating.tsx";

interface ProductDetailsProps {
    product: any;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                    <p>Description: {product.description}</p>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
}
