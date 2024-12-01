import React from "react";
import { Link } from "react-router-dom";

interface PaymentInfoProps {
    paymentMethod: string;
}

export function PaymentInfo({ paymentMethod }: PaymentInfoProps) {
    return (
        <div className="mb-4 p-6 bg-white rounded-lg border-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
                <Link
                    to="/payment"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                    Edit
                </Link>
            </div>
            <p className="text-sm text-gray-700 mb-2">
                <strong className="font-medium">Method:</strong> {paymentMethod}
            </p>
        </div>
    );
}
