import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { Signup} from './pages/Signup'
import { Game } from './pages/Game'
import { Test } from './pages/Test'
import { NoMatch } from './pages/Nomatch'


function App() {
  return (
    <div style={{height: '100% !important'}}>
      <Router>
        <Navbar />        
        <Switch>
          <Route exact path='/login'>
            <Login/>
          </Route>        
          <Route exact path='/'>
            <Game />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


const ProtectRoute = ({ children }) => {
  const user = window.localStorage.getItem('user')
  
  return (
    <Route
      // {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default App;
