import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBox from "../../../components/MessageBox.tsx";
import { Store } from "../../../Store.tsx";
import { CartItem } from "../../../types/CartItem.ts";
import { CartItemList } from "./components/CartItemList";
import { CartSummary } from "./components/CartSummury.tsx";

export default function CartPage() {
    const navigate = useNavigate();

    const {
        state: {
            cart: { cartItems },
        },
        dispatch,
    } = useContext(Store);

    const updateCartHandler = (item: CartItem, quantity: number) => {
        if (item.virtualCountInStock < quantity) {
            toast.warn("Sorry. Product is out of stock", { autoClose: 1000 });
            return;
        }
        dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...item, quantity },
        });
    };

    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping");
    };

    const removeItemHandler = (item: CartItem) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };

    return (
        <div className="mx-3">
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1 className="h3 pb-4 mx-3">Shopping Cart</h1>
            <Row className="mx-3">
                <Col className="p-0" md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link className="underline font-bold text-blue-500 hover:text-blue-700" to="/">
                                Go Shopping
                            </Link>
                        </MessageBox>
                    ) : (
                        <CartItemList
                            cartItems={cartItems}
                            updateCartHandler={updateCartHandler}
                            removeItemHandler={removeItemHandler}
                        />
                    )}
                </Col>
                <Col md={4}>
                    <CartSummary cartItems={cartItems} checkoutHandler={checkoutHandler} />
                </Col>
            </Row>
        </div>
    );
}
