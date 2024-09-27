// Write your code here
import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/cartContext'

import './index.css'

const CartSummary = () => {
  const [isConfirm, setIsConfirm] = useState(false)
  const handleConfirm = () => {
    setIsConfirm(!isConfirm)
  }
  const handleConfirmButtonClick = () => (
    alert('Your order has been placed successfully')
  )
  

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <div className="summary-con">
            <h1 className="summary-con-head">
              Order Total:{' '}
              <span className="summary-con-span">Rs {total}/-</span>
            </h1>
            <p className="summary-con-para">{cartList.length} items in cart</p>

            <div>
              <Popup
                trigger={
                  <button className="summary-con-button" type="button">
                    CheckOut
                  </button>
                }
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" type="button" onClick={close}>
                      &times;
                    </button>
                    <div className="header"> Select Payment Interface </div>
                    <div className="content">
                      <div className="bill-con">
                        <p>{cartList.length} items selected</p>
                        <p>
                          Total Bill : <span>{total} /-</span>
                        </p>
                      </div>
                      <div>
                        <input type="radio" id="card" value="card" disabled />
                        <label htmlFor="card">Card</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="netBanking"
                          value="netBanking"
                          disabled
                        />
                        <label htmlFor="netBanking">Net Banking </label>
                      </div>
                      <div>
                        <input type="radio" id="upi" value="upi" disabled />
                        <label htmlFor="upi">UPI</label>
                      </div>
                      <div>
                        {' '}
                        <input
                          type="radio"
                          id="wallet"
                          value="wallet"
                          disabled
                        />
                        <label htmlFor="wallet">Wallet</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="cod"
                          value="cod"
                          checked={isConfirm}
                          onChange={handleConfirm}
                        />
                        <label htmlFor="cod">Cash on Delivery</label>
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        disabled={!isConfirm}
                        type="button"
                        className="button"
                        onClick={handleConfirmButtonClick}
                      >
                        {' '}
                        Confirm Order{' '}
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary