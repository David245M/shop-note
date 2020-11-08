import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [nick, setNick] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async e => {
    try {
      e.preventDefault()
      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nick, email, password })
      })
      const result = response.json()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input name="nick" value={nick} onChange={e => setNick(e.target.value)} placeholder="Nick"/>
        <input name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
        <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
        <button type="submit">Register now!</button>
      </form>
      <Link to="/login">...or sign in</Link>
    </>
  )
}

export default RegisterPage
