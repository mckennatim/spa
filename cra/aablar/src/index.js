import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import createHistory from 'history/createBrowserHistory'

// const p = createHistory().location.pathname


ReactDOM.render(<App path='aablar'/>, document.getElementById('root'));
registerServiceWorker();
