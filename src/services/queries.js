import { keepPreviousData, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getProduct, getProducts, getProjects, getUser, getUsersIds } from './api'

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

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
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
      const cachedProducts = queryClient.getQueryData(['products']);
      if (cachedProducts) {
        const products = cachedProducts.pages?.flat(2);
        return products?.find((item) => item.id === id);
      }
    },
  })
}
