import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { useProductContext } from '../../Context/ProductContext';

const RelatedProducts = () => {
  const { allProducts } = useProductContext();
  return (
    <div className='relatedproducts'>
      <h1 className='text-4xl font-bold tracking-tight text-red-500 text-center mb-6'>Related Products</h1>
      <hr />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {allProducts.slice(0,4).map((item, i)=>{
            return <Item key={i} product={item} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
