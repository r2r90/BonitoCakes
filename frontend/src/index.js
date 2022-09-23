import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// * Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// * Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// *  React Alert for errors
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
// *


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </Provider>,
);
