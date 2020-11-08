import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './contexts/Auth';
import HomePage from './pages/Home';
import LoginPage from './pages/Login'
import MainPage from './pages/Main';
import RegisterPage from './pages/Register'

function App() {
  const { isAuth } = useContext(AuthContext)
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
