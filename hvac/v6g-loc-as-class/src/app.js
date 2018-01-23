import React from 'react'
import ReactDOM from 'react-dom';
import { Observable } from 'rxjs/Observable';
import {routing} from './routing'
import {App, Dog} from './components'
import { createStore } from './rxred';
import { log } from './utilities';
import {initState} from './store'
import {setDeviceType, copyStore, disconnect, reconnect} from './actions'

window.onblur = ()=>{
	console.log('in app disconnect')
	disconnect()
}

window.onfocus = ()=>{
	console.log('window on focus')
	//console.log(window.location.hash)
	reconnect(window.location.hash)
}

Observable.fromEvent(window, 'resize')
  .debounceTime(300)
  .subscribe((e)=>setDeviceType(window.innerWidth));

const container = document.getElementById('app');
createStore(initState)
  .do(log)
  .subscribe((state) =>{
  	copyStore(state)
    return ReactDOM.render(<App {...state} />, container)
  });

var router=routing()

export{router}
