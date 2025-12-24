import React from 'react'
import { PaginatedData, Product } from '@/models/Product'
import {Card} from './Card'

function ProductListView({data}:PaginatedData<Product>) {
  return (
      <>
        <div className="row g-4">
          {data.map((prod,ind)=> <div key={prod.id} className="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center">
            <Card product={prod} key={prod._id} index={ind} />
          </div>)}
        </div>
      </>
  )
}

export const ProductList = React.memo(ProductListView);

