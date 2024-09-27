import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation,Navigate } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import ProductItemDetails from './components/ProductItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/cartContext';
import NotFound from './components/NotFound'



const App = () => {
  const [cartList, setCartList] = useState([])
  const removeAllCartItems = () => setCartList([])

  // const navigate = useNavigate()

  const addCartItem = (product) => {
    const productObject = cartList.find(each => each.id === product.id)
    if (productObject) {
      setCartList(prev => (prev.map(each => {
        if (each.id === productObject.id) {
          const updateQuantity = each.quantity + product.quantity
          return { ...each, quantity: updateQuantity }
        }
        return each
      })))
    } else {
      const updatedCartList = [...cartList, product]
      setCartList(updatedCartList)
    }
  }

  const removeCartItem = (id) => {
    const updatedCartList = cartList.filter(each => each.id !== id)
    setCartList(updatedCartList)
  }

  const incrementCartItemQuantity = id => {
    setCartList(prev => (prev.map(eachItem => {
      if (id === eachItem.id) {
        const updatedQuantity = eachItem.quantity + 1
        return { ...eachItem, quantity: updatedQuantity }
      }
      return eachItem
    })))
  }

  const decrementCartItemQuantity = id => {
    const productObject = cartList.find(eachObject => eachObject.id === id)
    if (productObject.quantity > 1) {
      setCartList(prev => prev.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = eachItem.quantity - 1
          return { ...eachItem, quantity: updatedQuantity }
        }
        return eachItem
      }))
    }
  }
  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        decrementCartItemQuantity,
        incrementCartItemQuantity
      }}

    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route
              exact
              path="/products/:id"
              element={<ProtectedRoute><ProductItemDetails /></ProtectedRoute>}
            />
            <Route exact path="/login" element={<LoginForm />} />
            <Route path="/not-found" element={<NotFound />} />
            {/* Redirect to /not-found for all undefined routes */}
            <Route path="*" element={<Navigate to="/not-found" />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </CartContext.Provider>
  );
};

export default App;

const Layout = ({ children }) => {
  const location = useLocation();
  const shouldShowHeader = location.pathname !== '/login' && location.pathname !== '/not-found';

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
};