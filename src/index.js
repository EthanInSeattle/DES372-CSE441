import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './Routes';
import './index.css';


ReactDOM.render(
  <div>
    <CssBaseline/>
    <Router>
      <Routes/>
    </Router>
  </div>,
  document.getElementById('app')
);

module.hot.accept();