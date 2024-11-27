import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

interface PaymentInfoProps {
    paymentMethod: string;
}

export function PaymentInfo({ paymentMethod }: PaymentInfoProps) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                    <strong>Method:</strong> {paymentMethod}
                </Card.Text>
                <Link to="/payment">Edit</Link>
            </Card.Body>
        </Card>
    );
}
