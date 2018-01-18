import React from 'react'
import ReactDOM from 'react-dom';
import Navigo from 'navigo';
import {App} from './comp'
//import {routing} from './routing'

const container = document.getElementById('app');
const state ={
	name: 'Ulysses'
}

const refreshRouter=(state, page)=>{
	let newState = {...state, page}
	ReactDOM.render(<App {...newState} />, container)
}

function switchPage(params){
	refreshRouter(state,params)
}

var router

const routing = ()=>{
	const cfg ={root: null, useHash: true}
	router = new Navigo(cfg.root, cfg.useHash);
	router
	  .on({
	    'about': ()=>{switchPage({name: 'About', params: null});},
			'dog': ()=>{switchPage({name: 'Dog', params: null});},
			'home': ()=>{switchPage({name: 'Home', params: null});},
			'HOC': ()=>{switchPage({name: 'HOC', params: null});},
	    '*': ()=>{switchPage({name: 'Home', params: null});}
	  })
	  .resolve();
	return router
}
var router=routing()

export{router, switchPage}
