import { Col, Row } from "react-bootstrap";
import { Product } from "../../../types/Product.ts";
import ProductItem from "./ProductItem.tsx";

interface ProductListProps {
    products: Product[];
}

export function ProductList({ products }: ProductListProps) {
    return (
        <Row>
            {products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3}>
                    <ProductItem product={product} />
                </Col>
            ))}
        </Row>
    );
}
