import { Form, Button, Col, Row } from "react-bootstrap";

interface SearchSectionProps {
    name: string;
    setName: (name: string) => void;
    handleSearch: (e: React.FormEvent) => void;
}

export function SearchSection({ name, setName, handleSearch }: SearchSectionProps) {
    return (
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
    );
}
