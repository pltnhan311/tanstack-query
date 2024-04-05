import { useQueries, useQuery } from '@tanstack/react-query'
import { getUser, getUsersIds } from './api'

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
        queryKey: ['user', id],
        queryFn: (() => getUser(id))
      }
    })
  })
}

