import Navigo from 'navigo';
import { switchPage} from './actions/responsive';

var router

const routing = ()=>{
  //const cfg ={root: 'http://10.0.1.233/spa/admin/dist/', useHash: true}
  const cfg ={root: null, useHash: true}
  router = new Navigo(cfg.root, cfg.useHash);
  router
    .on({
      'products': ()=> {switchPage({name: 'Products', params: null});} ,
      'products/:id': (params)=>{switchPage({name: 'Products', params: params});},
      'about': ()=>{switchPage({name: 'About', params: null});},
      'dog': ()=>{switchPage({name: 'Dog', params: null});},
      'counter': ()=>{switchPage({name: 'Counter', params: null});},
      'btheme': ()=>{switchPage({name: 'Btheme', params: null});},
      'atheme': ()=>{switchPage({name: 'Atheme', params: null});},
      'unstated': ()=>{switchPage({name: 'Unstated', params: null});},
      'registered': (params, query)=> {switchPage({name: 'Registered', params: {...params, query: query}});} ,
      '*': ()=>{switchPage({name: 'Home', params: null});}
    })
    .resolve();
  return router
}

export {routing}
