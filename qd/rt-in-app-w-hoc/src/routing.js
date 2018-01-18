import Navigo from 'navigo';
import { switchPage} from './app';
console.log(switchPage);

var router

const routing = ()=>{
	const cfg ={root: null, useHash: true}
	// router = new Navigo(cfg.root, cfg.useHash);
	// router
	//   .on({
	//     'about': ()=>{switchPage({name: 'About', params: null});},
	// 		'dog': ()=>{switchPage({name: 'Dog', params: null});},
	// 		'home': ()=>{switchPage({name: 'Home', params: null});},
	// 		'HOC': ()=>{switchPage({name: 'HOC', params: null});},
	//     '*': ()=>{switchPage({name: 'Home', params: null});}
	//   })
	//   .resolve();
	// return router
}

export {routing}
