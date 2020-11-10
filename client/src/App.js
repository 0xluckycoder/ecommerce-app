import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import ProductShowCase from './Components/ProductShowCase';
import SignUp from './Components/Auth/SignUp';

import { AuthContext } from './Context/AuthContext';

import { ACTIONS } from './actions';

function App() {

  // const { state, dispatch } = useContext(AuthContext);

  // const setLocalStorage = (token) => {
  //   return localStorage.setItem('token', token);
  // };

  // function tokenConfig() {
  //   const token = localStorage.getItem('token');
  //   const config = {
  //     method: 'GET',
  //     headers: {
  //       "Content-type": "application/json"
  //     }
  //   };
  //   if (token) config.headers['x-auth-token'] = token;
  //   return config;
  // }

  // async function loadUser() {
  //   dispatch({ type: ACTIONS.USER_LOADING });
  //   try {
  //     const response = await fetch('/api/auth/user', tokenConfig());
  //     const data = await response.json();
      
  //     // check for errors
  //     if (data.msg) {
  //       console.log(data);
  //     } else {
  //       dispatch({ type: ACTIONS.USER_LOADED, payload: data }); 
  //     }
    
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function logout() {
  //   dispatch({ type: ACTIONS.LOGOUT_SUCCESS });
  // }

  // async function register() {
  //   const obj = {
  //     name: 'gra',
  //     email: 'gra@email.comm',
  //     password: '12345'
  //   };

  //   // Request body
  //   const body = JSON.stringify({ name: obj.name, email: obj.email, password: obj.password });
  //   // Headers
  //   const config = {
  //     method: 'POST',
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body
  //   };

  //   try {
  //     const response = await fetch('/api/users', config);
  //     const data = await response.json();
  //     if (data.msg) {
  //       console.log('my error', data);
  //     } else {
  //       console.log(data);
  //       dispatch({type: ACTIONS.REGISTER_SUCCESS });
  //       setLocalStorage(data.token);
  //     }
  //   } catch (error) {
  //     logout();
  //     dispatch({ type: ACTIONS.REGISTER_FAIL });
  //     console.log('error registering a user', error);
  //   }

  //   console.log('however the function rannn');
  // }

  // // Login
  // async function login() {
  //   const obj = {
  //     email: 'gra@email.comm',
  //     password: '12345'
  //   };

  //   // Request body
  //   const body = JSON.stringify({ email: obj.email, password: obj.password });
  //   // Headers
  //   const config = {
  //     method: 'POST',
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body
  //   };

  //   try {
  //     const response = await fetch('/api/auth', config);
  //     const data = await response.json();
  //     if (data.msg) {
  //       console.log('my error', data);
  //     } else {
  //       console.log(data);
  //       dispatch({type: ACTIONS.LOGIN_SUCCESS });
  //       setLocalStorage(data.token);
  //     }
  //   } catch (error) {
  //     logout();
  //     dispatch({ type: ACTIONS.LOGIN_FAIL });
  //     console.log('error registering a user', );
  //   }

  //   console.log('however the function rannn');
  // }
  

  // useEffect(() => {
  //   loadUser();
  // }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dark-coffee" />} />
          <Route path="/dark-coffee" component={Home} />
          <Route path="/product/:id" component={ProductShowCase} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
      {/* <button onClick={register}>click me</button>
      <br />
      <br />
      <button onClick={logout}>Log me out</button>
      <br />
      <button onClick={login}>Login</button> */}
    </div>
  );
}

export default App;
