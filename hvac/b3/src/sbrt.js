import createHistory from 'history/createBrowserHistory'
import {switchPage} from './actions'
// import * as compoi from '../components'
// //console.log(switchPage);
// const history = createHistory()

// console.log(history);
// console.log(location);
//console.log(compoi["Home"]);
// const refreshPage = (location,action)=>{
//   // location is an object like window.location
//   console.log(action, location.pathname, location.state)
//   console.log(location.hash.slice(1));
//   switchPage({name: 'LocList', params: null})
// }
// refreshPage(history.location, "POP")
// const unlisten = history.listen((location, action) =>refreshPage(location, action) )
//
// const rts = [
//   {rt: 'loclist', fn: 'Loclist'},
//   {rt: 'home/:locid', fn: 'Home'},
//   {rt: 'login', fn: 'Login'}
// ]
// const rts2 = [
//   ['loclist', 'Loclist'],
//   ['home/:locid', 'Home'],
//   ['login', 'Login']
// ]
// const art = rts.find((x)=>{
//   return x.rt==='login'
// });
// const findRt = (rt)=>{
//   return rts.find((x)=>{
//     return x.rt===rt
//   })
// }
// const findRt2=(rt)=>rts.find((x)=>x.rt===rt)
// const findInRt=(akey, aval)=>rts.find((x)=>x[akey]===aval)
// const findInRt2=(idx, aval)=>rts2.find((x)=>x[idx]===aval)
// const findByRt=(aval)=>findInRt2(0,aval)
// const findByFn=(aval)=>findInRt2(1,aval)

const createRouter = (rts)=>{
  const findInRts=(idx, aval)=>rts.find((x)=>x[idx]===aval);
  const findByRt= (aval)=>{
    var rt = findInRts(0,aval)
    return rt
  }
  const setPg = (loc)=>{

  }
  const findByFn= (aval)=>findInRts(1,aval)
  const history = createHistory()
  var curloc = location.hash.slice(1)
  const refreshPage = (location,action)=>{
    // location is an object like window.location
    console.log(action, location.pathname, location.state)
    curloc= location.hash.slice(1);
    const en = findByRt(curloc)[1];

    var pg
    //console.log(findByRt(curloc)[1]);
    switchPage({name: en, params: null})
  }
  const unlisten = history.listen((location, action) =>refreshPage(location, action) )
  return {
    rts: rts,
    curloc: curloc,
    findByRt: findByRt,
    findByFn: findByFn,
    refresh: ()=>refreshPage(history.location, "POP")
  }
}

//const router = createRouter(rts2)

// console.log(router.findByRt('loclist'));
// console.log(router.rts);
//
// console.log(art);
// console.log(findRt('loclist'));
// console.log(findRt2('login'));
// console.log(findInRt('fn', 'Login'));
// console.log(findInRt2(1, 'Login'));
// console.log(findByRt('login'));
// console.log(findByFn('Login'));
export {createRouter}
