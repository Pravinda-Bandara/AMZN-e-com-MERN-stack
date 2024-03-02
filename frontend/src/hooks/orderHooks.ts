import {useMutation, useQuery} from "@tanstack/react-query";
import {CartItem, ShippingAddress} from "../types/CartItem.ts";
import apiClient from "../apiClient.ts";
import {Order} from "../types/Order.ts";
import {Product} from "../types/Product.ts";


export const useGetOrderDetailsQuery = (id: string) =>
    useQuery({
        queryKey: ['orders', id],
        queryFn:async ()=>(await apiClient.get<Order>(`api/orders/${id}`)).data
    })

export const useGetOrderHistoryQuery = () =>
    useQuery({
        queryKey: ['order-history'],
        queryFn: async () =>
            (await apiClient.get<[Order]>(`/api/orders/mine`)).data,
    })

export const useCreateOrderMutation = () =>
    useMutation({
        mutationFn: async (order: {
            orderItems: CartItem[]
            shippingAddress: ShippingAddress
            paymentMethod: string
            itemsPrice: number
            shippingPrice: number
            taxPrice: number
            totalPrice: number
        }) =>
            (
                await apiClient.post<{ message: string; order: Order }>(
                    `api/orders`,
                    order
                )
            ).data,
    })
export const usePayOrderMutation = () =>
    useMutation({
        mutationFn: async (details: { orderId: string }) =>
            (
                await apiClient.patch<{ message: string; order: Order }>(
                    `api/orders/${details.orderId}/pay`,
                    details
                )
            ).data,
    })

export const useDeliverOrderMutation = () =>
    useMutation({
        mutationFn: async (orderId: string) =>
            (
                await apiClient.patch<{ message: string; order: Order }>(
                    `api/orders/${orderId}/deliver`
                )
            ).data,
    })

export const useDeleteOrderMutation = () =>
    useMutation({
        mutationFn: async (orderId: string) =>
            (await apiClient.delete<{ message: string }>(`api/orders/${orderId}`))
                .data,
    })


export const useGetOrdersQuery = () =>
    useQuery({
        queryKey: ['orders'],
        queryFn: async () => (await apiClient.get<[Order]>(`api/orders`)).data,
    })

export const useGetProductDetailsQuery = (id: string) =>
    useQuery({
        queryKey: ['products', id],
        queryFn: async () =>
            (await apiClient.get<Product>(`api/products/${id}`)).data,
    })