import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Store} from "../../../Store.tsx";
import CheckoutSteps from "../../../components/CheckoutSteps.tsx";
import {Helmet} from "react-helmet-async";
import {Button, Form} from "react-bootstrap";

export default function PaymentMethodPage() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(Store)
    const {
        cart: { shippingAddress, paymentMethod },
    } = state

    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    )

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/placeorder')
    }
    return (
        <div className="mx-3">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="container small-container px-4">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className="my-3 h3">Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="PayPal"
                            label="PayPal"
                            value="PayPal"
                            checked={paymentMethodName === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="Stripe"
                            label="Stripe"
                            value="Stripe"
                            checked={paymentMethodName === 'Stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Button type="submit" className="customOrangeButton1">Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}