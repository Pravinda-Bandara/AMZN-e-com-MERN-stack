import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../Store.tsx";
import { useCreateOrderMutation } from "../../../hooks/orderHooks.ts";
import { toast } from "react-toastify";
import { getError } from "../../../util.ts";
import { ApiError } from "../../../types/ApiError.ts";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../../../components/CheckoutSteps.tsx";
import { ShippingInfo } from "./components/ShippingInfo";
import { PaymentInfo } from "./components/PaymentInfo";
import { OrderItems } from "./components/OrderItem.tsx";
import { OrderSummary } from "./components/OrderSummury.tsx";
import { Col, Row } from "react-bootstrap";

export default function PlaceOrderPage() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    const round2 = (num: number) =>
        Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

    const placeOrderHandler = async () => {
        try {
            const data = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            });
            // Clear cart
            dispatch({ type: "CART_CLEAR" });
            localStorage.removeItem("cartItems");
            navigate(`/order/${data.order._id}`);
        } catch (err) {
            toast.error(getError(err as ApiError), { autoClose: 1000 });
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart, navigate]);

    return (
        <div className="mx-3">
            <CheckoutSteps step1 step2 step3 step4 />
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <h1 className="my-3 h3 px-4">Preview Order</h1>
            <Row className="px-4">
                <Col md={8}>
                    <ShippingInfo shippingAddress={cart.shippingAddress} />
                    <PaymentInfo paymentMethod={cart.paymentMethod} />
                    <OrderItems cartItems={cart.cartItems} />
                </Col>
                <Col md={4}>
                    <OrderSummary
                        itemsPrice={cart.itemsPrice}
                        shippingPrice={cart.shippingPrice}
                        taxPrice={cart.taxPrice}
                        totalPrice={cart.totalPrice}
                        onPlaceOrder={placeOrderHandler}
                        isPending={isPending}
                        disableButton={cart.cartItems.length === 0}
                    />
                </Col>
            </Row>
        </div>
    );
}
