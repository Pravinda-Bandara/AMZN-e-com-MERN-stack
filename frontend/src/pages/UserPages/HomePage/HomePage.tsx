import { Col, Row, Form, Button } from "react-bootstrap";
import MessageBox from "../../../components/MessageBox.tsx";
import LoadingBox from "../../../components/LoadingBox.tsx";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery, useGetCategoriesQuery, useGetBrandsQuery } from "../../../hooks/productHooks.ts";
import { getError } from "../../../util.ts";
import { ApiError } from "../../../types/ApiError.ts";
import { useState, useEffect } from "react";
import { Filters } from "./components/Filters.tsx";
import { Categories } from "./components/Categories.tsx";
import { ProductList } from "./components/ProductList.tsx";
import { SearchSection } from "./components/SearchSection.tsx";

export function HomePage() {
  // State for filters and pagination
  const [searchInput, setSearchInput] = useState<string>(''); // For user input
  const [name, setName] = useState<string>(''); // For API query
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('latest');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  // State for min and max price range (set initial to null for no price filter)
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Fetch products with filters
  const { data, isLoading, error } = useGetProductsQuery({
    searchQuery: name,
    category,
    brand: brand.join(','),
    sort,
    page,
    pageSize,
    minPrice,
    maxPrice,
  });

  // Fetch dynamic categories and brands
  const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery(brand.join(','));
  const { data: brands, isLoading: loadingBrands } = useGetBrandsQuery(category, name, minPrice, maxPrice);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    setName(searchInput); // Trigger API request
  };

  // Apply filters when the user clicks the "Apply Filters" button
  const handleApplyFilters = (filters: {
    sort: string;
    brand: string[];
    minPrice: number | null;
    maxPrice: number | null;
  }) => {
    setSort(filters.sort);
    setBrand(filters.brand);
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
    setPage(1); // Reset to first page when filters are applied
  };

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>

      <Row className="mb-3 flex justify-center">
        {/* Sidebar - Filters */}
        <Col md={2} className="p-3 bg-light text-dark rounded-2">
          <Filters
            sort={sort}
            setSort={setSort}
            brand={brand}
            setBrand={setBrand}
            brands={brands || []}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onApplyFilters={handleApplyFilters} // Pass the function to apply filters
          />
        </Col>

        {/* Main Content - Product List */}
        <Col md={9}>
          <Categories category={category} setCategory={setCategory} categories={categories || []} />

          <SearchSection
            name={searchInput} // Bind input state
            setName={setSearchInput} // Update only the input state
            handleSearch={handleSearch} // Update the query state on form submit
          />
            {isLoading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
              <ProductList products={data!.products} page={page} pages={data!.pages} setPage={setPage} />
            )}
        </Col>
      </Row>
    </div>
  );
}
