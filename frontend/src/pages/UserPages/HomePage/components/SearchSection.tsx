import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

interface SearchSectionProps {
    name: string;
    setName: (name: string) => void;
    handleSearch: (e: React.FormEvent) => void;
}

export function SearchSection({ name, setName, handleSearch }: SearchSectionProps) {
    return (
        <Row className="mb-3">
            <Col md={12}>
                <Form onSubmit={handleSearch}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-light text-dark no-focus-outline"
                        />
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                    </InputGroup>
                </Form>
            </Col>
        </Row>
    );
}
