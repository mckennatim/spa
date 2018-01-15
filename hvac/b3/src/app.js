import React from 'react'
// import {routing} from './routing'
import { log } from './utilities';
// import { history } from './utilities/loc';
import { createStore } from './rxred';
import {initState} from './store'
// console.log(history.location);
// console.log(initState);
// console.log('in app');
import ReactDOM from 'react-dom';
import {App} from './components/App'

const container = document.getElementById('app');
createStore(initState)
  .do(log)
  .subscribe((state) =>{
    return ReactDOM.render(<App {...state} />, container)
  });

// var router = routing()
// export{router}
