import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Container className="text-center bg-white p-6 rounded-md shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-4">
          Oops! The page you’re looking for can’t be found.
        </p>
        <img
          src="https://via.placeholder.com/300x200" // Replace with an appropriate image
          alt="Not Found"
          className="mx-auto mb-4 rounded-md"
        />
        <Button
          variant="warning"
          className="w-full py-2 text-white hover:bg-orange-600"
          onClick={handleHomeRedirect}
        >
          Go to Homepage
        </Button>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Need help? Contact our <a href="/support" className="text-orange-500 underline">Support</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
