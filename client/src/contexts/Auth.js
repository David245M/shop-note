import {createContext} from 'react'
import useAuth from '../hooks/auth.hook'
const AuthContext = createContext({
  token: null,
  userID: null,
  login: () => {},
  logout: () => {},
  isAuth: false
})

const AuthProvider = ({ children }) => {
  const { login, logout, token, userID } = useAuth()  
  const isAuth = !!token

  return (
    <AuthContext.Provider value={{ login, logout, token, userID, isAuth }} >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }