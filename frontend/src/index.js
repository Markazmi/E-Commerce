import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './Store';
import {transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// provider = connect redux and react
const options={
  // to show alert in center
  position: positions.BOTTOM_CENTER,
  // alert will disappear after 5 seconds
  setTimeout: 5000,
  // lets see
  transitions: transitions.SCALE

}

ReactDOM.render(
  <Provider store = {store}>
    <AlertProvider template={AlertTemplate} {...options} >
    <App />
    </AlertProvider>
   
  </Provider>,
  document.getElementById('root')
);
