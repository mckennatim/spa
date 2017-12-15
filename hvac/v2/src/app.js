import React from 'react'
import {routing} from './routing'
import { log } from './utilities';
import { createStore } from './rxred';
import {initState} from './store'


import ReactDOM from 'react-dom';
import {App} from './components'

const container = document.getElementById('app');
createStore(initState)
  .do(log)
  .subscribe((state) =>{
    return ReactDOM.render(<App {...state} />, container)
  });

var router = routing()
export{router}
