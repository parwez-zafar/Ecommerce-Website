import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
// import { BrowserRouter } from 'react-router-dom';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';




const setupAxios = () => {
  axios.defaults.baseURL = "http://localhost:4000";
  // axios.defaults.baseURL = "https://api-connect2nature.onrender.com/"; //->latest deployed

  axios.defaults.headers = {
    "Cache-Control": "no-cache,no-store",
    Pragma: "no-cache",
    Expires: "200000",
  };
};
setupAxios();


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <AlertProvider template={AlertTemplate} {...options}>

      <App />

    </AlertProvider>

  </Provider>
);


