import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { ThreeDots } from 'react-loader-spinner';
import ProductCard from '../ProductCard';
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}
const PrimeDealsSection = () => {
    const [primeProducts, setPrimeProducts] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    useEffect(() => {
        const token = Cookies.get('jwt_token')
        const apiUrl = 'https://apis.ccbp.in/prime-deals'

        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        }
        const getPrimeDeals = async () => {
            const response = await fetch(apiUrl, options)
            if (response.ok) {
                const data = await response.json()
                const updatedData = data.prime_deals.map(prod => ({
                    title: prod.title,
                    imageUrl: prod.image_url,
                    rating: prod.rating,
                    brand: prod.brand,
                    price: prod.price,
                    id: prod.id,
                }))
                setPrimeProducts(updatedData)
                setApiStatus(apiStatusConstants.success)
            }
            else {
                setApiStatus(apiStatusConstants.failure)
            }

        }
        getPrimeDeals()
    }, [])

    const renderPrimeDealsListView = () => {
        return (
          <div>
            <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
            <ul className="products-list">
              {primeProducts.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        )
      }
    const renderPrimeDealsFailureView = () => (
        <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="register prime"
            className="register-prime-img"
        />
    )

    const renderLoadingView = () => (
        <div className="primedeals-loader-container">
            <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
    )

    const renderContent = ()=>{
        switch (apiStatus) {
            case apiStatusConstants.success:
              return renderPrimeDealsListView()
            case apiStatusConstants.failure:
              return renderPrimeDealsFailureView()
            case apiStatusConstants.inProgress:
              return renderLoadingView()
            default:
              return null
          }
    }

    return (
        <div>{renderContent()}</div>
    )
}

export default PrimeDealsSection