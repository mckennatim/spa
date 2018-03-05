import Navigo from 'navigo';
import { switchPage} from './actions/responsive';

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
      'at/:loc': (params)=>{switchPage({name: 'AtLoc', params: params});},
      'at/:loc/:sr': (params)=>{switchPage({name: 'SensorRelay', params: params})},
      'sched/:loc/:sr/': (params)=>{switchPage({name: 'WeekSched', params: params})},
      'sched/:loc/:sr/:day': (params)=>{switchPage({name: 'DaySched', params: params});},
      'timerctl/:loc/:sr/:day': (params)=>{switchPage({name: 'TimerCtl', params: params});},
      'savesched/:loc/:sr': (params)=>{switchPage({name: 'SaveSched', params: params});},
      'about': ()=>{switchPage({name: 'About', params: null});},
      'dog': ()=>{switchPage({name: 'Dog', params: null});},
      'home': ()=>{switchPage({name: 'Home', params: null});},
      '*': ()=>{switchPage({name: 'Home', params: null});}
    })
    .resolve();
  return router
}

export {routing}
