import React from 'react'
import { PaginatedData, Product } from '@/models/Product'
import Card from './Card'
function ProductListView({data}:PaginatedData<Product>) {
  return (
      <>
        <h2>Best Selling</h2>
        <div className="row g-4">
          {data.map((prod)=> <div key={prod.id} className="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center">
            <Card key={prod._id} _id={prod._id} category={prod.category} description={prod.description} imageCover={prod.imageCover} images={prod.images} price={prod.price} title={prod.title} ratingsAverage={prod.ratingsAverage} />
          </div>)}
        </div>
      </>
  )
}

const ProductList = React.memo(ProductListView);

export default ProductList;