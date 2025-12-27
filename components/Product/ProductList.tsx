import React from 'react'
import { PaginatedData, Product } from '@/models/Product'
import {Card} from './Card'

function ProductListView({allData, compare}:{allData:PaginatedData<Product>,compare:Product[]}) {

  return (
      <>
        <div className="row g-4">
          {allData.data.map((prod,ind)=> <div key={prod._id} className="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center">
            <Card active={compare.some((comp) => prod._id === comp._id)} product={prod} key={prod.id} index={ind} />
          </div>)}
        </div>
      </>
  )
}

export const ProductList = React.memo(ProductListView);

