import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import AuthContextProvider from './Context/AuthContext';
import ItemContextProvider from './Context/ItemContext';
import NavbarContextProvider from './Context/NavbarContext';

ReactDOM.render(
  <React.StrictMode>
    <NavbarContextProvider>
    <ItemContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ItemContextProvider>
    </NavbarContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
