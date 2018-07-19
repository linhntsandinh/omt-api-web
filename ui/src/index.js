import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Web from './Web';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Web />, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
