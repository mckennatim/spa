import React from 'react'// eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';// eslint-disable-line no-unused-vars
import {App} from './components'// eslint-disable-line no-unused-vars
var initState={name: "ulysses"}


const container = document.getElementById('app');
ReactDOM.render(<App {...initState} />, container)
