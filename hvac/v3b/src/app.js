import React from 'react'
import { log } from './utilities';
import { createStore } from './rxred';
import {initState} from './store'
import ReactDOM from 'react-dom';
import {App} from './components'
import {routing} from './routing'
console.log('in app');
var router = routing()
console.log(location.hash.slice(1));
console.log(router);
//location.assign(router.link(location.hash.slice(1)))


const container = document.getElementById('app');
createStore(initState)
  .do(log)
  .subscribe((state) =>{
    return ReactDOM.render(<App {...state} />, container)
  });

export {router}
