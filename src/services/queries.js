import { keepPreviousData, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  getFood,
  getFoods,
  getFoodsIds,
  getFoodsPaginated,
  getProduct,
  getProducts,
  getProjects,
  getTodoList,
  getUser,
  getUsersIds,
} from './api'

export function useFood(id) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['food', { id }],
    queryFn: () => getFood(id),
    enabled: !!id, // run if only id is truthy
    placeholderData: () => {
      // queryClient.getQueryData(['foods'])?.pages?.flat(2)?.find(food => food.id === id),
      const cachedFoods = queryClient.getQueryData(['foods'])
      if (cachedFoods) {
        const foods = cachedFoods.pages?.flat(2)
        return foods?.find((item) => item.id === id)
      }
    },
  })
}

export function useFoodsPaginated(page) {
  return useQuery({
    queryKey: ['foods', { page }],
    queryFn: () => getFoodsPaginated(page),
    placeholderData: keepPreviousData,
  })
}

export function useFoods() {
  return useQuery({
    queryKey: ['foods'],
    queryFn: () => getFoods(),
  })
}

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodoList(),
  })
}

export function useUsersIds() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsersIds,
    // refetchOnWindowFocus: false,
    // enabled: false,
  })
}

export function useUsers(ids) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ['user', { id }],
        queryFn: () => getUser(id),
      }
    }),
  })
}

export function useProjects(page) {
  return useQuery({
    queryKey: ['projects', { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  })
}

export function useFoodsInfinite() {
  return useInfiniteQuery({
    queryKey: ['foods'],
    queryFn: getFoods,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.next === null) {
        return undefined
      }
      return lastPageParam + 1
    },
  })
}

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
  })
}

export const useProduct = (id) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProduct(id),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = queryClient.getQueryData(['products'])
      if (cachedProducts) {
        const products = cachedProducts.pages?.flat(2)
        return products?.find((item) => item.id === id)
      }
    },
  })
}
