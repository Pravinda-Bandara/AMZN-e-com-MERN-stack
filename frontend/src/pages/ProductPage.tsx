import {useNavigate, useParams} from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks.ts";
import React, {useContext} from "react";
import LoadingBox from "../components/LoadingBox.tsx";
import MessageBox from "../components/MessageBox.tsx";
import {convertProductToCartItem, getError} from "../util.ts";
import { ApiError } from "../types/ApiError.ts";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Rating from "../components/Rating.tsx";
import {Store} from "../Store.tsx";
import {toast} from "react-toastify";

function ProductPage() {
    const params = useParams();
    const { slug } = params;
    console.log(slug);
    const {
        data: product,
        refetch,
        isLoading,
        error,
    } = useGetProductDetailsBySlugQuery(slug!);

    const {state,dispatch}=useContext(Store)
    const{cart} = state

    const navigate=useNavigate();
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product!.countInStock < quantity) {
            toast.warn('Sorry. Product is out of stock',{
                autoClose:1000
            })
            return
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...convertProductToCartItem(product!), quantity },
        })
        toast.success('Product added to the cart',{
            autoClose:1000
        })
        navigate('/cart')
    }

    console.log(product); // Add this line to check the value of product
    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !product ? (
        <MessageBox variant="danger">Product Not Found</MessageBox>
    ) : (
        <div>
            <Row>
                <Col md={6}>
                    <img className="large" src={product.image} alt={product.name}></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{product.name}</title>
                            </Helmet>
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            ></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description:
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? (
                                                <Badge bg="success">In Stock</Badge>
                                            ) : (
                                                <Badge bg="danger">Unavailable</Badge>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button  onClick={addToCartHandler} variant="primary">Add to Cart</Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductPage;
