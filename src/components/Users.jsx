import React from 'react'
import { useUsers, useUsersIds } from '../services/queries'
import { useIsFetching } from '@tanstack/react-query'
import { useCreateUser, useDeleteUser, useUpdateUser } from '../services/mutations'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

export const Users = () => {
  const userIdsQuery = useUsersIds()
  const usersQueries = useUsers(userIdsQuery.data)

  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  const { register, handleSubmit } = useForm()

  const isFetching = useIsFetching()

  const handleCreateUser = (data) => {
    createUserMutation.mutate(data)
  }

  const handleUpdateUser = (data) => {
    updateUserMutation.mutate({ ...data, name: 'mono' })
  }

  const handleDeleteUser = (id) => {
    deleteUserMutation.mutate(id)
  }

  if (userIdsQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (userIdsQuery.isError) {
    return <div>There is an error</div>
  }

  return (
    <>
      <p>Query data status: {userIdsQuery.status}</p>
      <p>Golbal isFetching: {isFetching}</p>

      <form onSubmit={handleSubmit(handleCreateUser)}>
        <h4>New user:</h4>
        <input placeholder='Name' {...register('name')} />
        <br />
        <input placeholder='Gender' {...register('gender')} />
        <br />
        <input
          type='submit'
          disabled={createUserMutation.isPending}
          value={createUserMutation.isPending ? 'Creating...' : 'Add User'}
        />
      </form>

      <ul>
        {usersQueries.map(({ data }) => {
          const { id, name, gender } = data?.data ?? {}
          return (
            <li key={uuidv4()}>
              <h3>Id: {id}</h3>
              <span>
                <p>Name: {name}</p>
                <p>Gender: {gender}</p>
              </span>
              <div>
                <button
                  onClick={() => handleUpdateUser(data?.data)}
                  disabled={data?.data?.name === 'mono'}
                >
                  {data?.data?.name === 'mono' ? 'Done' : 'Change'}
                </button>
                <button onClick={() => handleDeleteUser(id)}>Delete user</button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
