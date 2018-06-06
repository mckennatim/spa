import React from 'react'// eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';// eslint-disable-line no-unused-vars
import { Observable } from 'rxjs/Observable';
import {routing} from './routing'
import {App} from './components' // eslint-disable-line no-unused-vars
import { createStore } from './rxred';
// import { log } from './utilities/wfuncs';
import {initState} from './store'
import {setDeviceType, setFocus} from './actions/responsive'
// import {setFocus} from './services/qactions'

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

let store1 = createStore(initState)
//console.log(store1)

store1
  //.do((state)=>console.log('state.cambio: ',JSON.stringify(state.cambio)))
  .subscribe((state) =>{
    return ReactDOM.render(<App {...state} />, container)
  });

var router=routing()

export{router}
