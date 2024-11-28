import { Form } from "react-bootstrap";

interface FiltersProps {
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    brand: string[];
    setBrand: React.Dispatch<React.SetStateAction<string[]>>;
    brands: string[];
}

export function Filters({ sort, setSort, brand, setBrand, brands }: FiltersProps) {
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
            <h5 className="h5">Filters</h5>

            {/* Sorting */}
            <Form.Group>
                <Form.Label className="h6">Sort By</Form.Label>
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
            <h6 className="mt-4 h6">Select Brands</h6>
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
        </div>
    );
}
