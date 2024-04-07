import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo, createUser, deleteUser, updateUser } from './api'

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newTodo) => {
      return createTodo(newTodo)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => {
      return createUser(data)
    },
    onMutate: () => {
      console.log('onMutate')
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: () => {
      console.log('onSuccess')
    },
    onSettled: async (_, error) => {
      console.log('onSettled')
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      }
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => updateUser(data),
    onMutate: () => {
      console.log('onMutate')
    },
    onError: () => {
      console.log('onError')
    },
    onSuccess: () => {
      console.log('onSuccess')
    },
    onSettled: async (_, error, variables) => {
      console.log('onSettled')
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
        await queryClient.invalidateQueries({ queryKey: ['user', { id: variables.id }] })
      }
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      console.log('onSuccess')
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      }
    },
  })
}
