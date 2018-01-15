import React from 'react'
import { log } from './utilities';
import { createStore } from './rxred';
import {initState} from './store'
import ReactDOM from 'react-dom';
import {App} from './components/app'
import {routing} from './routing'

var router

const container = document.getElementById('app');
createStore(initState)
  .do(log)
  .subscribe((state) =>{
    console.log('doggy');
    router = routing()
    console.log(router);
    // router.navigate('about')
    // router.navigate('loclist')
    return ReactDOM.render(<App {...state} />, container)
  });

console.log('in app');
export {router}
