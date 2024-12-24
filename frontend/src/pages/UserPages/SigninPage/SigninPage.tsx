import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../../Store.tsx';
import { useSigninMutation } from '../../../hooks/userHooks.ts';
import { ApiError } from '../../../types/ApiError.ts';
import { getError } from '../../../util.ts';
import { Button, Form, Container, Card } from 'react-bootstrap';

export default function SigninPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const { mutateAsync: signin, isPending } = useSigninMutation();

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Email and password are required', { autoClose: 1000 });
            return; 
        }

        try {
            const data = await signin({ email, password });
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect);
        } catch (err) {
            const errorMessage = getError(err as ApiError);
            toast.error(errorMessage, { autoClose: 1000 });
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
                <title>Sign In</title>
            </Helmet>
            <Container className="w-full max-w-md">
                <Card className="shadow-lg">
                    <Card.Body className="p-6">
                        <h2 className="text-xl font-semibold text-center mb-1">Welcome Back</h2>
                        <p className="text-center text-sm text-gray-500 mb-4">
                            Sign in to your account to continue
                        </p>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-4" controlId="email">
                                <Form.Label className="block text-sm font-medium text-gray-700">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                    value={email}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <div className="mb-4">
                                <Button
                                    type="submit"
                                    className="customOrangeButton"
                                    disabled={isPending}
                                >
                                    {isPending ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </div>
                            <div className="text-center text-sm text-gray-500">
                                New customer?{' '}
                                <Link to={`/signup?redirect=${redirect}`} className="text-orange-500 hover:underline">
                                    Create your account
                                </Link>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
