import React from 'react'
import ReactDOM from 'react-dom';
import {Dog} from './components'
import { createStore } from './rxred';
var initState={name: "ulysses"}

const container = document.getElementById('app');
createStore(initState)
  .subscribe((state) =>{
    return ReactDOM.render(<Dog {...state} />, container)
  });

// var router=routing()

// export{router}

