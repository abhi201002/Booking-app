import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Datalayer } from './components/Datalayer';
import { initialState, reducer } from './components/reducer';
import { Authlayer } from './components/AuthLayer';
import { authinitialState, authreducer } from './components/authreducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Datalayer reducer={reducer} initialState={initialState}>
      <Authlayer reducer={authreducer} initialState={authinitialState}>
          <App />
      </Authlayer>
    </Datalayer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();