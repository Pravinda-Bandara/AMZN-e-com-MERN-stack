import {useMutation, useQuery} from '@tanstack/react-query'
import apiClient from '../apiClient.ts'
import { UserInfo } from '../types/UserInfo.ts'
import {User} from "../types/User.ts";

export const useSigninMutation = () =>
    useMutation({
        mutationFn: async ({
                               email,
                               password,
                           }: {
            email: string
            password: string
        }) =>
            (
                await apiClient.post<UserInfo>(`api/users/signin`, {
                    email,
                    password,
                })
            ).data,
    })


export const useSignupMutation = () =>
    useMutation({
        mutationFn: async ({
                               name,
                               email,
                               password,
                           }: {
            name: string
            email: string
            password: string
        }) =>
            (
                await apiClient.post<UserInfo>(`api/users/signup`, {
                    name,
                    email,
                    password,
                })
            ).data,
    })

export const useGetUsersQuery = () =>
    useQuery({
        queryKey: ['users'],
        queryFn: async () => (await apiClient.get<[User]>(`api/users`)).data,
    })

export const useDeleteUserMutation = () =>
    useMutation({
        mutationFn: async (userId: string) =>
            (await apiClient.delete<{ message: string }>(`api/users/${userId}`)).data,
    })
