import React, { useState, useCallback, useEffect } from 'react'

const name = "userInfo"

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userID, setUserID] = useState(null) 

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserID(id)
    localStorage.setItem(name, JSON.stringify({ userID: id, token: jwtToken }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserID(null)
    localStorage.removeItem(name)
  }, [])

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem(name))
    if (info?.token) {
      login(info.token, info.userID)
    }
  })
  return { token, userID, login, logout}
}

export default useAuth