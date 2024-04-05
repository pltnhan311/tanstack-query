import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from './api'

export function userCreateUser() {
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
    onSuccess: (newUser) => {
      console.log('onSuccess')
      // Update the 'users' query data with the new user
      queryClient.setQueryData(['users'], (oldUsers) => {
        const updatedUsers = [...oldUsers, newUser];
        console.log('Updated users:', updatedUsers);
        return updatedUsers;
      })
      console.log('pass')
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
