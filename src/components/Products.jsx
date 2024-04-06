import React, { Fragment } from 'react'
import { useProduct, useProducts } from '../services/queries'

export const Products = () => {
  const [selectedProductId, setSelectedProductId] = React.useState(null)

  const productsQuery = useProducts()
  const productQuery = useProduct(selectedProductId)

  return (
    <>
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <>
              <button
                style={{ display: 'flex', margin: '5px' }}
                onClick={() => setSelectedProductId(product.id)}
              >
                {product.model}
              </button>
            </>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
        >
          {productsQuery.isFetchingNextPage
            ? 'Loading more...'
            : productsQuery.hasNextPage
            ? 'Load more'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>Selected product:</div>
      <p>{JSON.stringify(productQuery.data)}</p>
    </>
  )
}
