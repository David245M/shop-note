import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth'

const MainPage = () => {
  const { logout } = useContext(AuthContext)
  return (
    <div>
      <h1>Your Page</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default MainPage
