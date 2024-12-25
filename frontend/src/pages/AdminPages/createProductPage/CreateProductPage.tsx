import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { ProductCreate } from "../../../types/Product";
import { useCreateProductMutation } from "../../../hooks/productHooks";

const CreateProductPage: React.FC = () => {
    const { mutate, isLoading, isError, error, isSuccess } = useCreateProductMutation();

    const [formData, setFormData] = useState<ProductCreate>({
        name: "",
        slug: "",
        image: null as unknown as File, // Set as File for FormData compatibility
        brand: "",
        category: "",
        description: "",
        price: 0,
        realCountInStock: 0,
        virtualCountInStock: 0,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "price" || name.includes("CountInStock")
                ? parseFloat(value) || 0
                : name === "image" && files?.length
                ? files[0] // Store the actual file
                : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare FormData for the mutation
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", formData.name);
        formDataToSubmit.append("slug", formData.slug);
        formDataToSubmit.append("image", formData.image);
        formDataToSubmit.append("brand", formData.brand);
        formDataToSubmit.append("category", formData.category);
        formDataToSubmit.append("description", formData.description);
        formDataToSubmit.append("price", formData.price.toString());
        formDataToSubmit.append("realCountInStock", formData.realCountInStock.toString());
        formDataToSubmit.append("virtualCountInStock", formData.virtualCountInStock.toString());

        mutate(formDataToSubmit, {
            onSuccess: (data) => {
                console.log("Product created successfully:", data);
                setFormData({
                    name: "",
                    slug: "",
                    image: null as unknown as File,
                    brand: "",
                    category: "",
                    description: "",
                    price: 0,
                    realCountInStock: 0,
                    virtualCountInStock: 0,
                });
            },
            onError: (err) => {
                console.error("Error creating product:", err);
            },
        });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={6} md={8} sm={12} className="mx-auto">
                    <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
                        Create Product
                    </h1>
                    {isError && <Alert variant="danger">{error?.message}</Alert>}
                    {isSuccess && <Alert variant="success">Product created successfully!</Alert>}
                    <Form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="slug">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="Enter product slug"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleInputChange}
                                accept="image/*"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                placeholder="Enter product brand"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Enter product category"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter product description"
                                rows={3}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Enter product price"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="realCountInStock">
                            <Form.Label>Real Count in Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="realCountInStock"
                                value={formData.realCountInStock}
                                onChange={handleInputChange}
                                placeholder="Enter real count in stock"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="virtualCountInStock">
                            <Form.Label>Virtual Count in Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="virtualCountInStock"
                                value={formData.virtualCountInStock}
                                onChange={handleInputChange}
                                placeholder="Enter virtual count in stock"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-full">
                            {isLoading ? <Spinner animation="border" size="sm" /> : "Create Product"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProductPage;
