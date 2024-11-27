import { Button, Col, Row } from "react-bootstrap";
import { Product } from "../../../types/Product.ts";
import ProductItem from "./ProductItem.tsx";

interface ProductListProps {
    products: Product[];
    page: number;
    pages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function ProductList({ products, page, pages, setPage }: ProductListProps) {
    return (
        <div>
            <Row>
                {products.map((product) => (
                    <Col key={product.slug} sm={6} md={4} lg={3}>
                        <ProductItem product={product} />
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Pagination */}
                <Button
                    variant="light"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {pages}
                </span>
                <Button
                    variant="light"
                    onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                    disabled={page === pages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
