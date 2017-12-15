import Navigo from 'navigo'
import {} from './components'
import { switchPage} from './actions';

const routing = ()=>{
	const cfg ={root: null, useHash: true}
	var router = new Navigo(cfg.root, cfg.useHash);
	router
	  .on({
			'loclist': ()=> {switchPage({name: 'LocList', params: null});},
			'home/:locid': (params)=> {switchPage({name: 'Home', params: params});},
			'login': ()=> {switchPage({name: 'Login', params: null});},
	    '*': ()=>{switchPage({name: 'Home', params: null});}
	  })
	  .resolve();
	return router
}

export {routing}
