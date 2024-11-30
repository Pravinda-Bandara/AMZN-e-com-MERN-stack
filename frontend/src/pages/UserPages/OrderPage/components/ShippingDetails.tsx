import { Card } from "react-bootstrap";
import MessageBox from "../../../../components/MessageBox.tsx";

interface ShippingDetailsProps {
    shippingAddress: any;
    isDelivered: boolean;
    deliveredAt?: string;
}

export function ShippingDetails({ shippingAddress, isDelivered, deliveredAt }: ShippingDetailsProps) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                    <strong>Name:</strong> {shippingAddress.fullName} <br />
                    <strong>Address: </strong> 
                    {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </Card.Text>
                {isDelivered ? (
                    <MessageBox variant="success">
                        Delivered at {new Date(deliveredAt!).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} on {new Date(deliveredAt!).toLocaleDateString()}
                    </MessageBox>
                ) : (
                    <MessageBox variant="warning">Not Delivered</MessageBox>
                )}
            </Card.Body>
        </Card>
    );
}
