import React from 'react'
import ReactDOM from 'react-dom';
import { Observable } from 'rxjs/Observable';
var Main = require('./components/Main');

const container = document.getElementById('app');
ReactDOM.render(<Main  />, container)
