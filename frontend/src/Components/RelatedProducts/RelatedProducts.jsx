import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { useProductContext } from '../../Context/ProductContext';

const RelatedProducts = () => {
  const { allProducts } = useProductContext();
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {allProducts.slice(0,4).map((item, i)=>{
            return <Item key={i} product={item} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
