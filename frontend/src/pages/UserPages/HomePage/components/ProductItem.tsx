import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "../../../../components/Rating";
import { Store } from "../../../../Store";
import { CartItem } from "../../../../types/CartItem";
import { Product } from "../../../../types/Product";
import { convertProductToCartItem } from "../../../../util";

export function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (product.virtualCountInStock < quantity) {
      toast.warn("Sorry, this product is out of stock.", { autoClose: 1000 });
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });

    toast.success("Product added to the cart.", { autoClose: 1000 });
  };

  return (
    <Card className="mb-4">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="text-muted my-1">${product.price.toFixed(2)}</Card.Text>
        {product.virtualCountInStock === 0 ? (
          <Button className="m-1" variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
            className="my-1 mt-3 customOrangeButton"
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
