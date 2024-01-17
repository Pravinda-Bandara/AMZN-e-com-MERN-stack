import {useQuery} from "@tanstack/react-query";
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


