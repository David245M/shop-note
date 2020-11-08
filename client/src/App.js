import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"> <Redirect to="/login"/> </Route>
        <Route path="/login">  <LoginPage /> </Route>
        <Route path="/register"><RegisterPage /> </Route>
      </Switch>
    </div>
  );
}

export default App;
