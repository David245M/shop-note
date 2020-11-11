import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './contexts/Auth';
import HomePage from './pages/Home';
import LoginPage from './pages/Login'
import MainPage from './pages/Main';
import RegisterPage from './pages/Register'

const Header = () => {
  return (
    <h1 style={{heigth: 100, width:'100%', textAlign: 'center', background: 'primary'}}>
      <Switch>
        <Route exact path="/">MAIN PA1GE</Route>
        <Route path="/login">NO HOME PAGE</Route>
        <Route path="/register">NO HOME PAGE</Route>
      </Switch>
    </h1>
  )
}

function App() {
  const { isAuth } = useContext(AuthContext)
  return (
    <div className="App"> 
      <Header />
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
