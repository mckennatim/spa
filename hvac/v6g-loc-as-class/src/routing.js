import Navigo from 'navigo';
import { switchPage, changeDevInfo} from './actions';

var router

const routing = ()=>{
	const cfg ={root: null, useHash: true}
	router = new Navigo(cfg.root, cfg.useHash);
	router
	  .on({
			'loclist': ()=> {switchPage({name: 'LocList', params: null});} ,
			'login': ()=> {switchPage({name: 'Login', params: null});} ,
			'registered': (params, query)=> {switchPage({name: 'Registered', params: {...params, query: query}});} ,
			'products': ()=> {switchPage({name: 'Products', params: null});} ,
			'products/:id': (params)=>{switchPage({name: 'Products', params: params});},
			'at/:loc': (params)=>{switchPage({name: 'Loc', params: params});},
	    'about': ()=>{switchPage({name: 'About', params: null});},
			'dog': ()=>{switchPage({name: 'Dog', params: null});},
			'home': ()=>{switchPage({name: 'Home', params: null});},
	    '*': ()=>{switchPage({name: 'Home', params: null});}
	  })
	  .resolve();
	return router
}

export {routing}
