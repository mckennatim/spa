import React from 'react'// eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';// eslint-disable-line no-unused-vars
import { Observable } from 'rxjs/Observable';
import {routing} from './routing'
import {App} from './components' // eslint-disable-line no-unused-vars
import { createStore } from './rxred';
// import { log } from './utilities/wfuncs';
import {initState} from './store'
import {setDeviceType, setFocus} from './actions/responsive'

window.focus()

window.onblur = ()=>{
    setFocus({infocus: false})
}

window.onfocus = ()=>{
    setFocus({infocus: true})
}

Observable.fromEvent(window, 'resize')
  .debounceTime(300)
  .subscribe(()=>setDeviceType(window.innerWidth));

const container = document.getElementById('app');
createStore(initState)
  //.do((state)=>console.log(state))// eslint-disable-line no-unused-vars 
  .do((state)=>console.log('state: ',JSON.stringify(state.cambio)))
  .subscribe((state) =>{
    return ReactDOM.render(<App {...state} />, container)
  });

var router=routing()

export{router}
