import { Form, Button } from "react-bootstrap";
import { useState } from "react";

interface FiltersProps {
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    brand: string[];
    setBrand: React.Dispatch<React.SetStateAction<string[]>>;
    brands: string[];
    minPrice: number | null;
    setMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
    maxPrice: number | null;
    setMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
    onApplyFilters: (filters: {
        sort: string;
        brand: string[];
        minPrice: number | null;
        maxPrice: number | null;
    }) => void;
}

export function Filters({
    sort,
    setSort,
    brand,
    setBrand,
    brands,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onApplyFilters,
}: FiltersProps) {
    const [localSort, setLocalSort] = useState(sort);
    const [localBrand, setLocalBrand] = useState(brand);
    const [localMinPrice, setLocalMinPrice] = useState(minPrice);
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedBrand = e.target.value;
        setLocalBrand((prev) =>
            prev.includes(selectedBrand)
                ? prev.filter((brand) => brand !== selectedBrand)
                : [...prev, selectedBrand]
        );
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setLocalMinPrice(null);
        } else {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
                setLocalMinPrice(numericValue);
            }
        }
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setLocalMaxPrice(null);
        } else {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
                setLocalMaxPrice(numericValue);
            }
        }
    };

    const handleApplyFilters = () => {
        onApplyFilters({
            sort: localSort,
            brand: localBrand,
            minPrice: localMinPrice,
            maxPrice: localMaxPrice,
        });
    };

    // Clear Filters function
    const handleClearFilters = () => {
        setLocalSort('latest');
        setLocalBrand([]);
        setLocalMinPrice(null);
        setLocalMaxPrice(null);

        onApplyFilters({
            sort: 'latest',
            brand: [],
            minPrice: null,
            maxPrice: null,
        });
    };

    return (
        <div>
            <h5 className="h5">Filters</h5>

            {/* Sorting */}
            <Form.Group>
                <Form.Label className="h6">Sort By</Form.Label>
                <Form.Control
                    as="select"
                    value={localSort}
                    onChange={(e) => setLocalSort(e.target.value)}
                    className="bg-light text-dark no-focus-outline"
                >
                    <option value="latest">Latest</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Top Rated</option>
                </Form.Control>
            </Form.Group>

            {/* Conditional Rendering for Brand Filters */}
            {brands?.length > 0 && (
                <>
                    <h6 className="mt-4 h6">Select Brands</h6>
                    <Form>
                        {brands.map((br) => (
                            <Form.Check
                                key={br}
                                type="checkbox"
                                id={`brand-${br}`}
                                label={br}
                                value={br}
                                checked={localBrand.includes(br)}
                                onChange={handleBrandChange}
                            />
                        ))}
                    </Form>
                </>
            )}

            {/* Price Range Filters */}
            <h6 className="mt-4 h6">Price Range</h6>
            <Form.Group>
                <Form.Label>Min Price</Form.Label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <Form.Control
                        type="text"
                        value={localMinPrice === null ? "" : localMinPrice}
                        onChange={handleMinPriceChange}
                        placeholder="Enter minimum price"
                        className="bg-light text-dark no-focus-outline"
                    />
                </div>
            </Form.Group>

            <Form.Group>
                <Form.Label>Max Price</Form.Label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <Form.Control
                        type="text"
                        value={localMaxPrice === null ? "" : localMaxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder="Enter maximum price"
                        className="bg-light text-dark no-focus-outline"
                    />
                </div>
            </Form.Group>

            {/* Apply Filters Button */}
            <Button
                variant="primary"
                onClick={handleApplyFilters}
                className="mt-3 w-full"
            >
                Apply Filters
            </Button>

            {/* Clear Filters Button */}
            <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="mt-3 w-full"
            >
                Reset Filters
            </Button>
        </div>
    );
}
