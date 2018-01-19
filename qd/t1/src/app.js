import React from 'react'
import ReactDOM from 'react-dom';
import Navigo from 'navigo';
import {App} from './comp'

const container = document.getElementById('app');
const state ={
	name: 'Ulysses'
}

const refreshRouter=(state, page)=>{
	let newState = {...state, page}
	ReactDOM.render(<App {...newState} />, container)
}

const switchPage=(params)=>{
	refreshRouter(state,params)
}
//////////////// routing ///////////////////////////
var routes= {
	'about': ()=>{switchPage({name: 'About', params: null});},
	'dog': ()=>{switchPage({name: 'Dog', params: null});},
	'home': ()=>{switchPage({name: 'Home', params: null});},
	'hoc': ()=>{switchPage({name: 'HOC', params: null});},
	'*': ()=>{switchPage({name: 'Home', params: null});}
}
var router
const routing = ()=>{
	const cfg ={root: null, useHash: true}
	router = new Navigo(cfg.root, cfg.useHash);
	router
	  .on(routes)
	  .resolve();
	return router
}
var router=routing()

export{router, switchPage}
