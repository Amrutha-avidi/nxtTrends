import React from 'react'
import CartContext from '../../context/cartContext' 
import CartSummary from '../CartSummary'
import CartItem from '../CartItem'


const CartListView = () => (
  <CartContext.Consumer>
    {value=>{
      const {cartList} = value
      return(
        <div className="cart-list-con">
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>

          <CartSummary />
        </div>
      )
    }}
  </CartContext.Consumer>

)

  
export default CartListView