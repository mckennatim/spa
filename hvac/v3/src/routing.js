import Navigo from 'navigo'
import { switchPage} from './actions';

const routing = ()=>{
	const cfg ={root: null, useHash: true}
	var router = new Navigo(cfg.root, cfg.useHash);
	router
	  .on({
			'loclist': ()=> {switchPage({rt: 'loclist', name: 'LocList', params: null});},
			'home/:locid': (params)=> {switchPage({rt: 'home', name: 'Home', params: params});},
			'login': ()=> {switchPage({rt: 'login', name: 'Login', params: null});},
			'about': ()=> {switchPage({rt: 'about', name: 'About', params: null});},
	    '*': ()=>{switchPage({rt: '', name: 'About', params: null});}
	  })
	  .resolve();
	return router
}
export {routing}
