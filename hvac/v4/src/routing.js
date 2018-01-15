import Navigo from 'navigo';
import {} from './components'
import { switchPage, changeDevInfo} from './actions';

var router

const routing = ()=>{
	//const cfg ={root: 'http://10.0.1.233/spa/admin/dist/', useHash: true}
	const cfg ={root: null, useHash: true}
	router = new Navigo(cfg.root, cfg.useHash);
	router
	  .on({
	  	// 'devices': ()=> {switchPage({name: 'Devices', params: null});},
	  	// 'devapps': ()=> {switchPage({name: 'DevicesApps', params: null});},
	  	// 'dev/:id': (params)=>{
      // 	var pro ={}
      // 	pro.ht = 'DevInf';
      // 	pro.par = params;
      // 	switchPage({name: 'DevInf', params: params})
      // 	changeDevInfo(pro)
      // },
	  	// 'dev/:id/:tmr': (params)=>{
      // 	var pro ={}
      // 	pro.ht = 'SenRel';
      // 	pro.par = params;
      // 	switchPage({name: 'SenRel', params: params})
      // 	changeDevInfo(pro)
      // },
	  	// 'admin/:devid': (params)=>{
      //   console.log('about to switch page')
      // 	switchPage({name: 'Admin', params: params})
      // 	//changeDevInfo(pro)
      // },
      // 'super/:devid': (params, query)=>{
      //   var params = {...params, query:query}
      //   switchPage({name: 'Super', params: params})
      // },
	    'products': ()=> {switchPage({name: 'Products', params: null});} ,
	    'products/:id': (params)=>{switchPage({name: 'Products', params: params});},
	    // 'products/:id/:inv': (params)=>{switchPage({name: 'Products', params: params});},
	    'about': ()=>{switchPage({name: 'About', params: null});},
	    'dog': ()=>{switchPage({name: 'Dog', params: null});},
      // 'registered': (params, query)=>{
      //   switchPage({name: 'Registered', params: {query: query}});
      // },
      // 'verify': (params, query)=>{
      //   switchPage({name: 'Verify', params: {query: query}});
      // },
	    '*': ()=>{switchPage({name: 'Home', params: null});}
	  })
	  .resolve();
	return router
}

export {routing, router}
