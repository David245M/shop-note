import React, { useContext, createContext } from 'react'
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { AuthContext } from './contexts/Auth';
import HomePage from './pages/Home';
import LoginPage from './pages/Login'
import MainPage from './pages/Main';
import RegisterPage from './pages/Register'
import Header from './Header'

import styled from 'styled-components'

const Content = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
`

function App() {
  const { isAuth } = useContext(AuthContext)
 
  return (
      <Content > 
        <Header/>
        <Switch>
          <Route exact path="/" >
            { isAuth ? <MainPage /> : <HomePage /> }
          </Route>
          <Route path="/register">
            { isAuth ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          <Route path="/login">
            { isAuth ? <Redirect to="/" /> : <LoginPage />}
          </Route>
        </Switch>
      </Content>
    
  );
}



export default App;
