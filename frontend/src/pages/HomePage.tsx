import { Col, Row, Form, Button, Nav } from "react-bootstrap";
import MessageBox from "../components/MessageBox.tsx";
import LoadingBox from "../components/LoadingBox.tsx";
import ProductItem from "../components/ProductItem.tsx";
import { Helmet } from "react-helmet-async";
import {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetBrandsQuery,
} from "../hooks/productHooks.ts";
import { getError } from "../util.ts";
import { ApiError } from "../types/ApiError.ts";
import { useState } from "react";

export function HomePage() {
    // State for filters and pagination
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [brand, setBrand] = useState<string[]>([]); // Multiple brands
    const [sort, setSort] = useState<string>("latest");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);

    // Fetch products
    const { data, isLoading, error } = useGetProductsQuery({
        searchQuery: name,
        category,
        brand: brand.join(","), // Pass as comma-separated string
        sort,
        page,
        pageSize,
    });

    // Fetch dynamic categories and brands
    const { data: categories, isLoading: loadingCategories } =
        useGetCategoriesQuery(brand.join(","));
    const { data: brands, isLoading: loadingBrands } =
        useGetBrandsQuery(category);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1); // Reset to the first page on search
    };

    // Handle brand selection (checkboxes)
    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedBrand = e.target.value;
        setBrand((prev) =>
            prev.includes(selectedBrand)
                ? prev.filter((brand) => brand !== selectedBrand)
                : [...prev, selectedBrand]
        );
    };

    return (
        <div>
            <Helmet>
                <title>Amazona</title>
            </Helmet>

            <Row className="mb-3">
                {/* Sidebar - Filters (Brand and Sorting) */}
                <Col md={3} className="p-3 bg-light text-dark rounded-2">
                    <h5>Filters</h5>

                    {/* Sorting */}
                    <Form.Group>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Control
                            as="select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-light text-dark"
                        >
                            <option value="latest">Latest</option>
                            <option value="lowest">Price: Low to High</option>
                            <option value="highest">Price: High to Low</option>
                            <option value="toprated">Top Rated</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Brand Filters (Checkbox Matrix) */}
                    <h6 className="mt-4">Select Brands</h6>
                    <Form>
                        {brands?.map((br) => (
                            <Form.Check
                                key={br}
                                type="checkbox"
                                id={`brand-${br}`}
                                label={br}
                                value={br}
                                checked={brand.includes(br)}
                                onChange={handleBrandChange}
                            />
                        ))}
                    </Form>
                </Col>

                {/* Main Content - Product List */}
                <Col md={9}>
                    {/* Category Tabs */}
                    <Nav
                        className="mb-3 p-3 rounded bg-light text-dark"
                        activeKey={category}
                        onSelect={(selectedCategory) => setCategory(selectedCategory)}
                    >
                        <Nav.Item>
                            <Nav.Link
                                eventKey=""
                                className={`rounded-pill ${category === "" ? "bg-secondary text-white" : "text-dark"}`}
                            >
                                All Categories
                            </Nav.Link>
                        </Nav.Item>
                        {categories?.map((cat) => (
                            <Nav.Item key={cat}>
                                <Nav.Link
                                    eventKey={cat}
                                    className={`rounded-pill ${category === cat ? "bg-secondary text-white" : "text-dark"}`}
                                >
                                    {cat}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Search and Filter Form */}
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form onSubmit={handleSearch} className="d-flex flex-wrap gap-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search products..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex-grow-1 bg-light text-dark"
                                />
                                <Button type="submit" variant="primary">
                                    Search
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                    {/* Product List */}
                    {isLoading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">
                            {getError(error as unknown as ApiError)}
                        </MessageBox>
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
                                    variant="light"
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                >
                                    Previous
                                </Button>
                                <span>
                                    Page {data!.page} of {data!.pages}
                                </span>
                                <Button
                                    variant="light"
                                    onClick={() => setPage((prev) => Math.min(prev + 1, data!.pages))}
                                    disabled={page === data!.pages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}
