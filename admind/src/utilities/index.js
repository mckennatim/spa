import React from 'react'
import ReactDOM from 'react-dom';
import {storageLocal} from './storageLocal'
import {deepObjModify} from './ofuncs'
import { Observable } from 'rxjs/Observable';
// import env from '../../env.json'
// const cfg= env[process.env.NODE_ENV||'development']

// const ls = storageLocal(cfg.appid)
// ls.deleteToken("tim2@sitebuilt.net")

const geta=(path, props)=>{
  return path.split(".")
  	.slice(1)
  	.reduce((xs,x)=>(xs && xs[x]) ? xs[x] : null , props)
}

const isObservable = obs => obs instanceof Observable;

const log = console.log.bind(console);

function el(id){
	return document.getElementById(id)
}

const dog = (cat)=>{
	console.log(cat)
	return 'girl'
}

const render = (pg, para)=>{
  ReactDOM.render(React.createElement(pg, para), document.getElementById('rt')) 
}

// const getCfg =()=>{
// 	return cfg
// }

const parseQuery = (query)=>{
	var obj = {};
	query.split('&')
		.map((term)=>{
			var ar = term.split('=')
			obj[ar[0]]=ar[1]
		}
	)
	return obj
}

export {geta, dog, render, isObservable, log, parseQuery, deepObjModify}