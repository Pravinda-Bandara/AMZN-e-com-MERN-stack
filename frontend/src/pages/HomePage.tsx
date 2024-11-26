import { Col, Row, Form, Button } from "react-bootstrap";
import MessageBox from "../components/MessageBox.tsx";
import LoadingBox from "../components/LoadingBox.tsx";
import ProductItem from "../components/ProductItem.tsx";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery, useGetCategoriesQuery, useGetBrandsQuery } from "../hooks/productHooks.ts";
import { getError } from "../util.ts";
import { ApiError } from "../types/ApiError.ts";
import { useState } from "react";

export function HomePage() {
    // State for filters and pagination
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [sort, setSort] = useState<string>('latest');
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);

    // Fetch products
    const { data, isLoading, error } = useGetProductsQuery({
        searchQuery: name,
        category,
        brand,
        sort,
        page,
        pageSize,
    });

    // Fetch dynamic categories and brands
    const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery(brand);
    const { data: brands, isLoading: loadingBrands } = useGetBrandsQuery(category);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to the first page on search
    };

    return (
        <div>
            <Helmet>
                <title>TS Amazona</title>
            </Helmet>
            <Row className="mb-3">
                {/* Search and Filter Form */}
                <Col md={12}>
                    <Form onSubmit={handleSearch} className="d-flex flex-wrap gap-3">
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-grow-1"
                        />
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={loadingCategories}
                        >
                            <option value="">All Categories</option>
                            {categories?.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            disabled={loadingBrands}
                        >
                            <option value="">All Brands</option>
                            {brands?.map((br) => (
                                <option key={br} value={br}>
                                    {br}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="latest">Latest</option>
                            <option value="lowest">Price: Low to High</option>
                            <option value="highest">Price: High to Low</option>
                            <option value="toprated">Top Rated</option>
                        </Form.Control>
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>

            {isLoading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <div>
                    <Row>
                        {data!.products.map((product) => (
                            <Col key={product.slug} sm={6} md={4} lg={3}>
                                <ProductItem product={product} />
                            </Col>
                        ))}
                    </Row>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        {/* Pagination */}
                        <Button
                            variant="secondary"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span>
                            Page {data!.page} of {data!.pages}
                        </span>
                        <Button
                            variant="secondary"
                            onClick={() => setPage((prev) => Math.min(prev + 1, data!.pages))}
                            disabled={page === data!.pages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
