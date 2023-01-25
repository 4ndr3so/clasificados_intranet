import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import $ from 'jquery';
import Popper from 'popper.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
import 'animate.css/animate.css'


ReactDOM.render(

    <App />
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
