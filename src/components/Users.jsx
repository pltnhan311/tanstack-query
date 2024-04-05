import React from 'react'
import { useUsers, useUsersIds } from '../services/queries'
import { useIsFetching } from '@tanstack/react-query'
import { userCreateUser } from '../services/mutations'
import { useForm } from 'react-hook-form'

export const Users = () => {
  const userIdsQuery = useUsersIds()
  const usersQueries = useUsers(userIdsQuery.data)
  console.log(usersQueries[0]?.data)
  const isFetching = useIsFetching()

  const { register, handleSubmit } = useForm()

  const createUserMutation = userCreateUser()
  const handleCreateUser = (data) => {
    console.log(data);
    createUserMutation.mutate(data)
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
        <h4>New todo:</h4>
        <input placeholder='Name' {...register('name')} />
        <br />
        <input placeholder='Email' {...register('email')} />
        <br />
        <button type='submit'>Add User</button>
      </form>

      <ul>
        {usersQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Name: {data?.name}</strong>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
