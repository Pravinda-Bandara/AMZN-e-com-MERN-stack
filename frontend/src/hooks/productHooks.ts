import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import { Product, ProductCreate } from "../types/Product.ts";

// Define types for query options and responses
type GetProductsQueryOptions = {
    searchQuery?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    sort?: string;
    page?: number;
    pageSize?: number;
};

type GetProductsResponse = {
    products: Product[];
    countProducts: number;
    page: number;
    pages: number;
};

export const useGetProductsQuery = (options: GetProductsQueryOptions) => {
    const {
        searchQuery,
        category,
        brand,
        minPrice,
        maxPrice,
        rating,
        sort,
        page,
        pageSize,
    } = options;

    return useQuery<GetProductsResponse, Error>({
        queryKey: [
            "products",
            {
                searchQuery,
                category,
                brand,
                minPrice,
                maxPrice,
                rating,
                sort,
                page,
                pageSize,
            },
        ],
        queryFn: async () => {
            const params = new URLSearchParams();

            // Appending query parameters only if they are defined
            if (searchQuery) params.append("searchQuery", searchQuery);
            if (category) params.append("category", category);
            if (brand) params.append("brand", brand);
            if (minPrice !== undefined && minPrice !== null) params.append("minPrice", minPrice.toString());
            if (maxPrice !== undefined && maxPrice !== null) params.append("maxPrice", maxPrice.toString());
            if (rating !== undefined) params.append("rating", rating.toString());
            if (sort) params.append("sort", sort);
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());

            // Making the API request
            const response = await apiClient.get<GetProductsResponse>(`api/products?${params.toString()}`);
            return response.data;
        },
    });
};


// Fetch product details by slug
export const useGetProductDetailsBySlugQuery = (slug: string) =>
    useQuery<Product, Error>({
        queryKey: ["product-details", slug],
        queryFn: async () =>
            (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
    });

// Fetch admin products with pagination
export const useGetAdminProductsQuery = (page: number, pageSize: number = 10) =>
    useQuery<GetProductsResponse, Error>({
        queryKey: ["admin-products", page, pageSize],
        queryFn: async () => {
            const response = await apiClient.get<GetProductsResponse>(
                `/api/products/admin?page=${page}&pageSize=${pageSize}`
            );
            return response.data;
        },
    });

// Delete a product by ID
export const useDeleteProductMutation = () =>
    useMutation<void, Error, string>({
        mutationFn: async (productId: string) => {
            await apiClient.delete(`api/products/${productId}`);
        },
    });

// Fetch product categories
export const useGetCategoriesQuery = (brand?: string) =>
    useQuery<string[], Error>({
        queryKey: ['categories', brand],
        queryFn: async () => {
            const response = await apiClient.get<string[]>(
                `/api/products/categories${brand ? `?brand=${brand}` : ''}`
            );
            return response.data;
        },
    });


// Fetch product brands
export const useGetBrandsQuery = (category: string, searchQuery: string, minPrice: number | null, maxPrice: number | null) =>
    useQuery<string[], Error>({
        queryKey: ['brands', { category, searchQuery, minPrice, maxPrice }], // Cache based on all filter criteria
        queryFn: async () => {
            const params = new URLSearchParams();
            if (category) params.append('category', category);
            if (searchQuery) params.append('searchQuery', searchQuery);
            if (minPrice !== null) params.append('minPrice', minPrice.toString()); // Check for null
            if (maxPrice !== null) params.append('maxPrice', maxPrice.toString()); // Check for null

            const response = await apiClient.get<string[]>(`/api/products/brands?${params.toString()}`);
            return response.data;
        },
        keepPreviousData: true, // Maintain old data during fetching
    });



// Create a product
export const useCreateProductMutation = () =>
    useMutation<{ product: Product; message: string }, Error, FormData>({
        mutationFn: async (formData: FormData) => {
            const response = await apiClient.post<{ product: Product; message: string }>(
                `/api/products`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        },
    });