import React, { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()


  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [navigate]);

  const submitSuccess = (token) => {

    Cookies.set('jwt_token', token, {
      expires: 30,
    })
    navigate('/')

  }


  const onSubmit = async (e) => {
    e.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      setShowError(false)
      submitSuccess(data.jwt_token)
    }
    else {
      setShowError(true)
      setErrorMsg(data.error_msg)
    }
  }




  return (
    <div className='login-form-container'>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className='form-container'>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">
          <label htmlFor="username" className='input-label'>USERNAME</label>
          <input type="text" id="username" className="input-field" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password" className='input-label'>PASSWORD</label>
          <input type="password" id="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="login-button" onClick={onSubmit}>Submit</button>
        {showError && <p className='error-message'>{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm