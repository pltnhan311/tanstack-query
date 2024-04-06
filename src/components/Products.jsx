import React, { Fragment } from 'react'
import { useProduct, useProducts } from '../services/queries'

export const Products = () => {
  const [selectedProductId, setSelectedProductId] = React.useState(null)

  const productsQuery = useProducts()
  const { data } = productsQuery
  console.log(data)
  console.log(productsQuery)
  const productQuery = useProduct(selectedProductId)

  console.log(productsQuery.data?.next !== null)

  return (
    <>
      {data?.pages?.map((group, index) => (
        <Fragment key={index}>
          {group?.data?.map((product) => (
            <button
              key={product.id}
              style={{ display: 'flex', margin: '5px' }}
              onClick={() => setSelectedProductId(product.id)}
            >
              {product.name}
            </button>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            data?.pages && data.pages.length > 0 && data.pages[data.pages.length - 1].next === null ||
            !productsQuery.hasNextPage ||
            productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? 'Loading more...'
            : data?.pages && data.pages.length > 0
            ? data.pages[data.pages.length - 1].next !== null
              ? 'Load more'
              : 'Nothing more to load'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>Selected product:</div>
      <p>{JSON.stringify(productQuery.data)}</p>
    </>
  )
}
