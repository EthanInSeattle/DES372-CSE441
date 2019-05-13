import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './client/HomePage';

const title = 'CSE polling';

ReactDOM.render(
  <div>
    <HomePage/>
  </div>,
  document.getElementById('app')
);

module.hot.accept();