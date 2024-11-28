import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import { Category } from "../types/Category.ts"; // Ensure you have the correct Category type

// Hook to get all categories
export const useGetCategoriesQuery = () =>
    useQuery({
        queryKey: ['categories'],
        queryFn: async () => (await apiClient.get<Category[]>('api/categories')).data,
    });

// Hook to get a single category by ID
export const useGetCategoryDetailsQuery = (id: string) =>
    useQuery({
        queryKey: ['categories', id],
        queryFn: async () => (await apiClient.get<Category>(`api/categories/${id}`)).data,
    });

// Hook to create a new category
export const useCreateCategoryMutation = () =>
    useMutation({
        mutationFn: async (category: { name: string }) =>
            (await apiClient.post<{ message: string; category: Category }>('api/categories', category)).data,
    });

// Hook to update an existing category
export const useUpdateCategoryMutation = () =>
    useMutation({
        mutationFn: async (category: { id: string, name: string }) =>
            (await apiClient.patch<{ message: string; category: Category }>(`api/categories/${category.id}`, { name: category.name })).data,
    });

// Hook to delete a category by ID
export const useDeleteCategoryMutation = () =>
    useMutation({
        mutationFn: async (categoryId: string) =>
            (await apiClient.delete<{ message: string }>(`api/categories/${categoryId}`)).data,
    });
