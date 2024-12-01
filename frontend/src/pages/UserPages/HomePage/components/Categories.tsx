import { Nav } from "react-bootstrap";

interface CategoriesProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    categories: string[];
}

export function Categories({ category, setCategory, categories }: CategoriesProps) {
    return (
        <Nav
            className="mb-3 p-3 rounded bg-light text-dark"
            activeKey={category}
            onSelect={(selectedCategory) => setCategory(selectedCategory)}
        >
            <Nav.Item>
                <Nav.Link
                    eventKey=""
                    className={`rounded-pill ${category === "" ? "bg-orange-500 text-white" : "text-dark"}`}
                >
                    All Categories
                </Nav.Link>
            </Nav.Item>
            {categories?.map((cat) => (
                <Nav.Item key={cat}>
                    <Nav.Link
                        eventKey={cat}
                        className={`rounded-pill ${category === cat ? "bg-orange-500 text-white" : "text-dark"}`}
                    >
                        {cat}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
}
