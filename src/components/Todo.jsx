import { useState } from 'react'
import { useCreateTodo } from '../services/mutations'
import { useTodos } from '../services/queries'

export function Todo() {
  const [todo, setTodo] = useState('')
  const { data, isPending, isError, error } = useTodos()
  const createTodoMutation = useCreateTodo()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const onCreateTodo = (e) => {
    e.preventDefault()
    createTodoMutation.mutate({ todo, userId: 100, completed: false })
  }

  return (
    <>
      <form onSubmit={onCreateTodo}>
        {createTodoMutation.error && (
          <h5 onClick={() => createTodoMutation.reset()}>{createTodoMutation.error}</h5>
        )}
        <input style={{ background: 'darkgray'}} type='text' value={todo} onChange={(e) => setTodo(e.target.value)} />
        <br />
        <button type='submit'>Create Todo Form</button>
      </form>
      <br />
      <div>
        {createTodoMutation.isPending ? (
          'Adding todo...'
        ) : (
          <>
            {createTodoMutation.isError ? (
              <div>An error occurred: {createTodoMutation.error.message}</div>
            ) : null}
            {createTodoMutation.isSuccess ? <div>New Todo added!</div> : null}
            <button
              onClick={() => {
                createTodoMutation.mutate({
                  todo: 'Do Laundry',
                  userId: 100,
                  completed: false,
                })
              }}
            >
              Create Todo
            </button>
          </>
        )}
      </div>
      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo} - {todo.completed}
          </li>
        ))}
      </ul>
    </>
  )
}
