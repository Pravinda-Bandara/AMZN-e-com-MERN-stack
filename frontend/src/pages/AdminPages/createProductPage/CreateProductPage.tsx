import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import { ProductCreate } from "../../../types/Product";
import { useCreateProductMutation, useGetCategoriesQuery } from "../../../hooks/productHooks";
import { ToastContainer, toast } from "react-toastify";

const CreateProductPage: React.FC = () => {
    const { mutate, isPending, isError, error, isSuccess } = useCreateProductMutation();
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

    const [formData, setFormData] = useState<ProductCreate>({
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

    const [imagePreview, setImagePreview] = useState<string>("");

    // Auto-generate slug and productName
    useEffect(() => {
        if (formData.brand && formData.name && formData.category) {
            const slug = `${formData.brand}-${formData.name}-${formData.category}`
                .toLowerCase()
                .replace(/\s+/g, "-");
            setFormData((prevData) => ({ ...prevData, slug }));
        }
    }, [formData.brand, formData.name, formData.category]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "price" || name.includes("CountInStock")
                ? parseFloat(value) || 0
                : name === "image" && files?.length
                ? files[0]
                : value,
        }));

        if (name === "image" && files?.length) {
            const fileReader = new FileReader();
            fileReader.onload = () => setImagePreview(fileReader.result as string);
            fileReader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value as string | Blob);
        });

        mutate(formDataToSubmit, {
            onSuccess: (data) => {
                toast.success("Product created successfully!");
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
                setImagePreview("");
            },
            onError: (err) => {
                toast.error("Error creating product. Please try again.");
                console.error(err);
            },
        });
    };

    return (
        <Container className="mt-5">
            <ToastContainer />
            <Row>
                <Col lg={6} md={8} sm={12} className="w-full">
                    <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
                        Create Product
                    </h1>
                    <Form onSubmit={handleSubmit} className="bg-white border-1 p-4 rounded">
                    <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>Virtual Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={`${formData.brand} ${formData.name} ${formData.category}`}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Product Name (Base)</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product base name"
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
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={(e) => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                                required
                                disabled={categoriesLoading}
                            >
                                <option value="">Select a category</option>
                                {categories?.map((cat: string) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        

                        <Form.Group className="mb-3" controlId="slug">
                            <Form.Label>Generated Slug</Form.Label>
                            <Form.Control type="text" value={formData.slug} readOnly />
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
                            {imagePreview && (
                                <div className="mt-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                                    />
                                </div>
                            )}
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
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter product price"
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="realCountInStock">
                            <Form.Label>Real Count in Stock</Form.Label>
                            <Form.Control
                                type="text"
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
                                type="text"
                                name="virtualCountInStock"
                                value={formData.virtualCountInStock}
                                onChange={handleInputChange}
                                placeholder="Enter virtual count in stock"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-full">
                            {isPending ? <Spinner animation="border" size="sm" /> : "Create Product"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProductPage;
