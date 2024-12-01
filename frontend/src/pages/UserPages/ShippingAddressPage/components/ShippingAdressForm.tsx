import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

interface ShippingAddressFormProps {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    onSubmit: (address: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    }) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ shippingAddress, onSubmit }) => {
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit({
            fullName,
            address,
            city,
            postalCode,
            country,
        });
    };

    return (
        <Card className="border-0 p-0 mx-2">
            <Card.Body className='p-0 my-2'>
                <Form className="mb-3" onSubmit={submitHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="fullName">
                            <Form.Label className='font-bold'>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                placeholder="Enter your full name"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="address">
                            <Form.Label className='font-bold'>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder="Enter your address"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md={6} controlId="city">
                            <Form.Label className='font-bold'>City</Form.Label>
                            <Form.Control
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                placeholder="City"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="postalCode">
                            <Form.Label className='font-bold'>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                placeholder="Postal Code"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="country">
                            <Form.Label className='font-bold'>Country</Form.Label>
                            <Form.Control
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                placeholder="Country"
                            />
                        </Form.Group>
                    </Row>

                    <div className="py-2">
                        <Button variant="primary" className='customOrangeButton1' type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ShippingAddressForm;
