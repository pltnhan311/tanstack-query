import React, { useState } from 'react'
import { useFood, useFoods, useFoodsInfinite, useFoodsPaginated } from '../services/queries'
import { useForm } from 'react-hook-form'
import { useCreateFood, useDeleteFood, useUpdateFood } from '../services/mutations'
import { Flex, Input, Button, Typography } from 'antd'

const Foods = () => {
  const { Title } = Typography
  const [selectedId, setSelectedId] = useState('')
  const [page, setPage] = useState(1)

  const { register, handleSubmit } = useForm()

  // const { data, error, isPending, isError } = useFoods()
  // const { data, error, isPending, isError, isPlaceholderData, isFetching } = useFoodsPaginated(page)
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
    <Flex gap='large'>
      <div>
        <form onSubmit={handleSubmit(onCreateFood)}>
          {mutationCreateFood.error && (
            <h5 onClick={mutationCreateFood.reset}>{mutationCreateFood.error}</h5>
          )}
          <h2>MENU</h2>
          Food: <Input placeholder='Food name' {...register('name')} />
          <br />
          <br />
          Price: <Input placeholder='Price food' {...register('price')} />
          <br />
          <br />
          <Button type='primary' size='middle' disabled={mutationCreateFood?.isPending}>
            {mutationCreateFood.isPending ? 'Adding...' : 'Add Food'}
          </Button>
        </form>
      </div>

      <div>
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
    </Flex>
  )
}

export default Foods

/* Dạ em chào anh, tuần trước em ngồi ôn lại các kiến thức Reactjs, thư viện UI.

Sau đó thì em đọc hiểu SRS tài liệu đặc tả NPP và tài liệu đặc tả API NPP

Và em đang có tìm hiểu thêm về TanstackQuery

tại sao lại có 2 keyword

gcTime: 60000, // 60s not work, cache remove query data
      staleTime: 40000, // 40s data -> old, refetch 

enable: boolean(id)

màn hình timeline là main ? xong tới màn hình Sheet ?

quản lý auth = redux toolkit - persist

sử dụng extraReducers -> builder.addCase để handle 3 trạng thái 'pending, fulfilled, rejected'

dùng createAsyncThunk thay cho async khi gọi api/ -> sử dụng trực tiếp trong createSlice ( signin, re-signin, signout )


├── node_modules
├── public
│   └── assets
│       └── images
├── src
│   ├── config
│   │   ├── axios - create nppAxios instance + setup interceptor
│   │   ├── theme.ts - customize Antd UI
│   │   └── query-client.ts - tạo queryClient và setup các thông số 
│   ├── modules
│   │   ├── _exampleModule
│   │   │   ├── actions
│   │   │   ├── components
│   │   │   ├── features
│   │   │   │   ├── _exampleFeature
│   │   │   │   │   ├── components
│   │   │   │   │   ├── page
│   │   │   │   │   └── index.tsx
│   │   │   │   └── ...
│   │   │   ├── hooks
│   │   │   ├── index.tsx
│   │   │   └── schema.ts
│   │   ├── _layouts
│   │   │   ├── DashboardLayout.tsx -> màn hình Sheet
│   │   │   ├── AuthLayout.tsx - <Outlet />
│   │   │   └── ...
│   │   ├── dashboard.tsx # landing page
│   │   └── index.tsx
│   ├── packages # package
│   │   ├── excel-template
│   │   └── ...
│   ├── shared # shared library
│   │   ├── actions
│   │   ├── components
│   │   ├── hooks
│   │   ├── constants
│   │   ├── contexts
│   │   ├── router
│   │   ├── schema
│   │   ├── utils
│   │   └── ...
│   ├── store # Redux store
│   ├── App.tsx
│   ├── AppProvider.tsx
│   ├── index.d.ts # declare type for app
│   ├── main.tsx
│   └── ...
├── README.md
├── package.json
├── index.html
└── ...



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
      </div>*/
