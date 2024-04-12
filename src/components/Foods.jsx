import React, { useState } from 'react'
import { useFood, useFoods, useFoodsInfinite, useFoodsPaginated } from '../services/queries'
import { useForm } from 'react-hook-form'
import { useCreateFood, useDeleteFood, useUpdateFood } from '../services/mutations'
import { Flex, Input, Button, Typography } from 'antd'
import './Food.css'

const Foods = () => {
  const { Title } = Typography
  const [selectedId, setSelectedId] = useState('')
  const [page, setPage] = useState(1)

  const { register, handleSubmit } = useForm()

  // const { data, error, isPending, isError } = useFoods()
  const {
    data: dataP,
    error: errorP,
    isPending,
    isError: isErrorP,
    isPlaceholderData: isPlaceholderDataP,
    isFetching: isFetchingP,
  } = useFoodsPaginated(page)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    status,
  } = useFoodsInfinite()

  console.log('====================================')
  console.log(data)
  console.log('hasNextPage', hasNextPage)
  console.log('isFetchingNextPage', isFetchingNextPage)
  console.log('isFetching', isFetching)
  console.log('status', status)
  console.log('====================================')

  const queryFood = useFood(selectedId)

  const mutationCreateFood = useCreateFood()
  const mutationUpdateFood = useUpdateFood()
  const mutationDeleteFood = useDeleteFood()

  const onCreateFood = (data) => {
    mutationCreateFood.mutate(data)
  }

  const onUpdatePrice = (data) => {
    const newStatus = data.status === 'sold' ? 'available' : 'sold'
    mutationUpdateFood.mutate({ ...data, status: newStatus })
  }

  const onDeleteFood = (id) => {
    mutationDeleteFood.mutate(id)
  }

  return (
    <Flex justify='center' gap={200}>
      <div>
        <form onSubmit={handleSubmit(onCreateFood)}>
          {mutationCreateFood.error && (
            <h5 onClick={mutationCreateFood.reset}>{mutationCreateFood.error}</h5>
          )}
          <h2>MENU</h2>
          Food: <input placeholder='Food name' {...register('name')} />
          <br />
          <br />
          Price: <input placeholder='Price food' {...register('price')} />
          <br />
          <br />
          Status: <input placeholder='Status food' {...register('status')} />
          <br />
          <br />
          <Button
            htmlType='submit'
            type='primary'
            size='middle'
            disabled={mutationCreateFood?.isPending}
          >
            {mutationCreateFood.isPending ? 'Adding...' : 'Add Food'}
          </Button>
        </form>
      </div>

      <div>
        <h2>INFINITY FOOD</h2>
        {status === 'pending' ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data?.pages?.map((group, i) => (
              <>
                {group?.data?.map((item) => (
                  <>
                    <p key={item.id}>
                      😋{item.name} - 💵{item.price} - {item.status}
                    </p>
                    <Flex wrap='wrap' gap='small'>
                      <Button type='primary' ghost onClick={() => setSelectedId(item.id)}>
                        Info
                      </Button>
                      <Button
                        type='primary'
                        primary
                        onClick={() => onUpdatePrice(item)}
                        disabled={mutationUpdateFood.isPending}
                      >
                        Update price
                      </Button>
                      <Button type='primary' danger onClick={() => onDeleteFood(item.id)}>
                        Delete
                      </Button>
                    </Flex>
                  </>
                ))}
              </>
            ))}
            <br />
            <div>
              <Button
                primary
                type='primary'
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
              </Button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
          </div>
        )}
      </div>

      <div>
        <h2>PAGINATED FOOD</h2>
        {isPending ? (
          <div>Loading...</div>
        ) : isErrorP ? (
          <div>Error: {errorP.message}</div>
        ) : (
          <div>
            {dataP?.data?.map((item) => (
              <>
                <p key={item.id}>
                  😋{item.name} - 💵{item.price} - {item.status}
                </p>
                <Flex wrap='wrap' gap='small'>
                  <Button type='primary' ghost onClick={() => setSelectedId(item.id)}>
                    Info
                  </Button>
                  <Button
                    type='primary'
                    primary
                    onClick={() => onUpdatePrice(item)}
                    disabled={mutationUpdateFood.isPending}
                  >
                    Update price
                  </Button>
                  <Button type='primary' danger onClick={() => onDeleteFood(item.id)}>
                    Delete
                  </Button>
                </Flex>
              </>
            ))}
            <h3>Current page: {page}</h3>
            <Button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 1}>
              Previous Page
            </Button>
            <Button
              onClick={() => {
                // if (!isPlaceholderData && data.hasMore) {
                if (!isPlaceholderDataP && dataP?.next !== null) {
                  setPage((old) => old + 1)
                }
              }}
              // Disable the Next Page button until we know a next page is available
              // disabled={isPlaceholderData || !data?.hasMore}
              disabled={isPlaceholderDataP || dataP?.next === null}
            >
              Next Page
            </Button>
            {isFetchingP ? <span> Loading...</span> : null} <p>{JSON.stringify(queryFood.data)}</p>
          </div>
        )}
      </div>
    </Flex>
  )
}

export default Foods

/*
<div>
        {isPending ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data?.data?.map((item) => (
              <>
                <p key={item.id}>
                  😋{item.name} - 💵{item.price} - {item.status}
                </p>
                <Flex wrap='wrap' gap='small'>
                  <Button type='primary' ghost onClick={() => setSelectedId(item.id)}>
                    Info
                  </Button>
                  <Button
                    type='primary'
                    primary
                    onClick={() => onUpdatePrice(item)}
                    disabled={mutationUpdateFood.isPending}
                  >
                    Update price
                  </Button>
                  <Button type='primary' danger onClick={() => onDeleteFood(item.id)}>
                    Delete
                  </Button>
                </Flex>
              </>
            ))}
            <h3>Current page: {page}</h3>
            <Button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 1}>
              Previous Page
            </Button>
            <Button
              onClick={() => {
                // if (!isPlaceholderData && data.hasMore) {
                if (!isPlaceholderData && data?.next !== null) {
                  setPage((old) => old + 1)
                }
              }}
              // Disable the Next Page button until we know a next page is available
              // disabled={isPlaceholderData || !data?.hasMore}
              disabled={isPlaceholderData || data?.next === null}
            >
              Next Page
            </Button>
            {isFetching ? <span> Loading...</span> : null} <p>{JSON.stringify(queryFood.data)}</p>
          </div>
        )}
      </div>
*/
