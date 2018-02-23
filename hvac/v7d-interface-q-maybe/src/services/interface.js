import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/from';
import { isObservable } from '../utilities/ofuncs';
import { fromMqtt$} from './fromMqtt';
import{getArrObjByObjKeyVal, getIdxYobj} from '../utilities/wfuncs'
import{qreducer} from './qreducer'

let ready

const action$ = new Subject();

const qcreateStore = (initState) =>
  action$
    .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
    .startWith(initState)
    .scan(qreducer);

const qactionCreator = (func) => (...args) => {
  const action = func.call(null, ...args);
  action$.next(action);
  if (isObservable(action.payload))
    action$.next(action.payload);
  return action;
};

const createMqttStore=(devs,zones)=>{
  let initstate = {devs, zones, shoulda:'couda'}
  // console.log(initstate)
  return qcreateStore(initstate)
}



var mqtt$ = {
  next() {},
  error(err) {throw err;},
  complete() {}
}

const mqttConnect= ()=>{
  //mqtt$.next('end')
  mqtt$ = fromMqtt$()
  mqtt$.subscribe(
    function (e) {
      var sp = e.topic.split("/")
      var job = sp[1];
      switch(job){
        case "ready":
          console.log(JSON.stringify(e))
          setReady(e.payload.ready)
          if(e.payload.ready){
            mqtt$.next({pubsub:'subscribe', topic:'CYURD003/srstate'})
            mqtt$.next({pubsub:'publish', topic:'CYURD003/req', message:`{\"id\":0,\"req\":\"srstates\"}`})
          }
          break;
        case "srstate":
          // console.log(JSON.stringify(e))
          grabSrstateData(e)
          break;
        case "timr":
          // grabTimrData(e.payload)
          break;
        case "flags":
          // grabFlagData(e.payload)
          break;
        case "sched":
          // console.log('grabSchedData')
          // grabSchedData(e)
          break;
      }
  });
}

const mqttEnd = ()=>{
  mqtt$.next('end')
  setReady(false)
}

const xfrmSrstate=(state, payload)=>{
  // console.log('state: ',JSON.stringify(state))
  // console.log('payload: ',JSON.stringify(payload))
  state.payload =payload
  return state
}


const srUpdateZdat=(devid, payload, devs, zdat)=>{
  let sYl =getArrObjByObjKeyVal('sr', payload.id , devs[devid])
  if(sYl){
    let zoi = getIdxYobj('id', sYl.label, zdat)
    if(zoi.obj){
      zoi.obj.ts = new Date()
      zoi.obj.temp = payload.darr[0]
      zoi.obj.relay = payload.darr[1]
      zoi.obj.setPt = Math.floor((payload.darr[2]+payload.darr[3])/2)
      var newzdat =zdat.slice(0)
      newzdat[zoi.idx]=zoi.obj
      return(zdat)
    }else{
      return zdat
    }
  }else {
    return zdat
  }
}
const progUpdateZdat=(devid, payload, devs, zdat)=>{
  let sYl =getArrObjByObjKeyVal('sr', payload.id , devs[devid])
  if(sYl){
    let zoi = getIdxYobj('id', sYl.label, zdat)
    if(zoi.obj){
      zoi.obj.ts = new Date()
      zoi.obj.sched = payload.pro
      var newzdat =zdat.slice(0)
      newzdat[zoi.idx]=zoi.obj
      return(newzdat)
    }else{
      return zdat
    }
  }else {
    return zdat
  }
}

const processMqttMessage = (mess, devs, zdat)=>{
  let dt = mess.destinationName.split('/')
  let devid = dt[0]
  let topic = dt[1]
  let payload = JSON.parse(mess.payloadString)
  switch(topic) {
    case "srstate" :
      return srUpdateZdat(devid, payload, devs, zdat)
    case "sched" :
      return progUpdateZdat(devid, payload, devs, zdat)
    default:
      return zdat  
  } 
}

const setReady = (tf)=>{
  ready = tf
}

const maybeConnect = (focused)=>{
  if(focused && !ready){
    console.log('focused & !ready -> should mqttConnect')
    mqttConnect()
  }else if(!focused && ready){
    console.log('ready, !focused -> should not connect')
    mqttEnd()
  }
}

/*------------------actions-----------------------*/

const grabSrstateData = qactionCreator((payload)=>{
  // console.log('setFocus payload: ',JSON.stringify(payload))
  return{
    type: 'SRSTATE_CHANGED',
    payload
  }
})



export{mqttConnect, mqttEnd, processMqttMessage, createMqttStore, qactionCreator, xfrmSrstate, maybeConnect}