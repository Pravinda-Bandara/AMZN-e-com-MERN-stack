import {useMutation, useQuery} from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import {Product} from "../types/Product.ts";


// Define the type for query options
type GetProductsQueryOptions = {
    name?: string
    category?: string
    brand?: string
    min?: number
    max?: number
    rating?: number
    sort?: string
    page?: number
    pageSize?: number
}

export const useGetProductsQuery = (options: GetProductsQueryOptions) => {
    const { name, category, brand, min, max, rating, sort, page, pageSize } = options

    return useQuery({
        queryKey: [
            'products',
            { name, category, brand, min, max, rating, sort, page, pageSize },
        ], // Include options in queryKey for cache invalidation
        queryFn: async () => {
            const params = new URLSearchParams()
            if (name) params.append('name', name)
            if (category) params.append('category', category)
            if (brand) params.append('brand', brand)
            if (min !== undefined) params.append('min', min.toString())
            if (max !== undefined) params.append('max', max.toString())
            if (rating !== undefined) params.append('rating', rating.toString())
            if (sort) params.append('sort', sort)
            if (page) params.append('page', page.toString())
            if (pageSize) params.append('pageSize', pageSize.toString())

            const response = await apiClient.get<Product[]>(
                `api/products?${params.toString()}`
            )
            return response.data
        },
    })
}

export const useGetProductDetailsBySlugQuery = (slug: string) =>
    useQuery({
        queryKey: ['products', slug],
        queryFn: async () =>
            (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,})


export const useGetAdminProdcutsQuery = (page: number) =>
    useQuery({
            queryKey: ['admin-products', page],
            queryFn: async () =>
                (
                    await apiClient.get<{
                            products: [Product]
                            page: number
                            pages: number
                    }>(`/api/products/admin?page=${page}`)
                ).data,
    })

export const useCreateProductMutation = () =>
    useMutation({
            mutationFn: async () =>
                (
                    await apiClient.post<{ product: Product; message: string }>(
                        `api/products`
                    )
                ).data,
    })
export const useDeleteProductMutation = () =>
    useMutation({
            mutationFn: async (productId: string) =>
                (await apiClient.delete(`api/products/${productId}`)).data,
    })
