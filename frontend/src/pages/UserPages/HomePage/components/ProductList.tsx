import { Button, Col, Row } from "react-bootstrap";
import { Product } from "../../../../types/Product.ts";
import ProductItem from "./ProductItem.tsx";
import { NoContent } from "../../../../components/NoContent.tsx";


interface ProductListProps {
    products: Product[];
    page: number;
    pages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function ProductList({ products, page, pages, setPage }: ProductListProps) {
    return (
        <div className="d-flex flex-column justify-between min-vh-100">
            <div className="flex-grow-1">
                {products.length === 0 ? (
                    <NoContent
                        title="No Products Found"
                        message="We couldn't find any products matching your search or filter criteria. Try adjusting the filters or search terms and try again."
                    />
                ) : (
                    <Row>
                        {products.map((product) => (
                            <Col key={product.slug} sm={6} md={4} lg={3}>
                                <ProductItem product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
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
