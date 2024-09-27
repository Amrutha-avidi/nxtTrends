import React from 'react'
import PrimeDealsSection from '../PrimeDealsSection'
import AllProductsSection from '../AllProductsSection'
import './index.css'

const Products = () => {
  return (
    <div className='product-sections'>
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  )
}

export default Products