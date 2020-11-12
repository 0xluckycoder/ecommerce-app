import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import ProductShowCase from './Components/ProductShowCase';
import SignUp from './Components/Auth/SignUp';
import { verifyToken } from './API/api';

import { AuthContext } from './Context/AuthContext';

import { ACTIONS } from './actions';

function App() {

  const { dispatch } = useContext(AuthContext);

  const loadUser = async () => {
    try {
      dispatch({ type: ACTIONS.USER_LOADING });
      const data = await verifyToken();
      if (data) {
        dispatch({ type: ACTIONS.USER_LOADED, payload: data }); 
      }
      console.log('load user success', data);
    } catch (error) {
      if (error) dispatch({ type: ACTIONS.AUTH_ERROR });
      console.log('no authenticated user', error);
    }

  }

  useEffect(() => {
    loadUser();
  }, []);

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
    </div>
  );
}

export default App;
