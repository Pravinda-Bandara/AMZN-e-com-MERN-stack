import React from "react";
import { Link } from "react-router-dom";

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
        <div className="mb-4 p-6 bg-white rounded-lg border-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Shipping Information</h2>
                <Link
                    to="/shipping"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                    Edit
                </Link>
            </div>
            <p className="text-sm text-gray-700 mb-2">
                <strong className="font-medium">Name:</strong> {shippingAddress.fullName}
            </p>
            <p className="text-sm text-gray-700 mb-4">
                <strong className="font-medium">Address:</strong> {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
        </div>
    );
}
