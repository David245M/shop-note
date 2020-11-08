import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'

const LoginPage = () => {
  const auth = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async event => {
    try {
      event.preventDefault()
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const result = await response.json()
      if (result) {
        auth.login(result.token, result.userId)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>      
      <Link to="/">Home</Link>
      <h1>Authorisation</h1>
      <form onSubmit={onSubmit}>
        <input name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
        <input name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"/>
        <button type="submit">Submit</button>
      </form>
      <Link to="/register" >Register</Link>
    </>
  )
}

export default LoginPage
