export type Product = {
    _id?: string;
    name: string;
    slug: string;
    image: string;
    images: string[];
    category: string;
    brand: string;
    price: number;
    realCountInStock: number; // Replaced countInStock with realCountInStock
    virtualCountInStock: number; // Added virtualCountInStock
    description: string;
    rating: number;
    numReviews: number;
}

// ProductCreate type for creating a product
export type ProductCreate = {
    name: string;
    slug: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    realCountInStock: number;
    virtualCountInStock: number;
    image: File;
};
