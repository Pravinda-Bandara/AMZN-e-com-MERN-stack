import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../../Store.tsx";
import { useSignupMutation } from "../../../hooks/userHooks.ts";
import { ApiError } from "../../../types/ApiError.ts";
import { getError } from "../../../util.ts";
import { Button, Form, Container, Card } from "react-bootstrap";

export default function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signup, isPending } = useSignupMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 1000 });
      return;
    }
    try {
      const data = await signup({ name, email, password });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError), { autoClose: 1000 });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Container className="w-full max-w-md">
        <Card className="shadow-lg">
          <Card.Body className="p-6">
            <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4" controlId="name">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="email">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="confirmPassword">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <div className="mb-4">
                <Button
                  type="submit"
                  className="customOrangeButton"
                  disabled={isPending}
                >
                  {isPending ? "Creating Account..." : "Sign Up"}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to={`/signin?redirect=${redirect}`} className="text-orange-500 hover:underline">
                  Sign-In
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
