import React from 'react'
import ReactDOM from 'react-dom';
import {App} from './components'
var initState={name: "ulysses"}


const container = document.getElementById('app');
ReactDOM.render(<App {...initState} />, container)
