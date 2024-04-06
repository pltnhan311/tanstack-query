import React, { useState } from 'react'
import { useProjects } from '../services/queries'

export default function Projects() {
  const [page, setPage] = useState(1)

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page)

  return (
    <div style={{ fontFamily: 'arial', color: 'green', lineHeight: '1.4' }}>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data?.data?.map((project) => (
            <p key={project.id}>
              {project.id} {' --- '}
              {project.name}
            </p>
          ))}
              <span>Current page: {page}</span>
              <br />
          <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 1}>Previous Page</button>
          <button
            onClick={() => {
              if (!isPlaceholderData) {
                setPage((old) => old + 1)
              }
            }}
            disabled={isPlaceholderData || page === data.pages}
          >
            Next Page
          </button>
          {isFetching ? <p>Loading...</p> : null}{' '}
        </div>
      )}
    </div>
  )
}
