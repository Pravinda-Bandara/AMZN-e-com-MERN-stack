import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

interface ShippingInfoProps {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
}

export function ShippingInfo({ shippingAddress }: ShippingInfoProps) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                    <strong>Name:</strong> {shippingAddress.fullName} <br />
                    <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},{" "}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                </Card.Text>
                <Link to="/shipping">Edit</Link>
            </Card.Body>
        </Card>
    );
}
