import {useMutation, useQuery} from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import {Product} from "../types/Product.ts";

export const useGetProductsQuery = () =>
    useQuery({
        queryKey: ['products'],//save this query,in cache as this key name
        //when access to this query ,this api call
        queryFn: async () =>
            (await apiClient.get<Product[]>(`api/products`)).data,})
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
