export type CartItem = {
    image: string | undefined;
    slug: string;
    quantity: number;
    realCountInStock: number;  // Replaced `countInStock` with `realCountInStock`
    virtualCountInStock: number;  // Added `virtualCountInStock`
    price: number;
    _id: string | undefined;
    name: string;
}

export type ShippingAddress = {
    fullName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
}

export type Cart = {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}
