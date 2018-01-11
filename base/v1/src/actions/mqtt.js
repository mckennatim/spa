import { actionCreator } from '../rxred';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import { map } from 'lodash';
import { fromMqtt$ } from './fromMqtt';
import {getCfg, ls} from '../utilities/getCfg'
import {router} from '../routing'
var cfg = getCfg()
var baseURL=cfg.url.api
/* ----------------helper functions-----------------------------*/

var mqtt$ = {
  next(value) {},
  error(err) {throw err;},
  complete() {}
}

var storeCopy = {mqtt: {currentDevId: 'instorcopy'}}
const copyStore= (props)=>{
  storeCopy = props
}
const connectAndSubscribe= (devId)=>{
  //mqtt$.next('end')
  mqtt$ = fromMqtt$(devId)
  mqtt$.subscribe(
    function (e) {
      var sp = e.topic.split("/")
      var job = sp[1];
      switch(job){
        case "ready":
          if(e.payload.ready){
            console.log('THIS SHIT IS READY') 
            mqtt$.next(`{\"id\":2,\"req\":\"flags\"}`)
            mqtt$.next(`{\"id\":3,\"req\":\"timr\"}`)
            mqtt$.next(`{\"id\":0,\"req\":\"srstates\"}`)
            mqtt$.next(`{\"id\":1,\"req\":\"progs\"}`) 
          } 
          break;
        case "srstate":
          grabSrstateData(e.payload) 
          break;
        case "timr":
          grabTimrData(e.payload)
          break;
        case "flags":
          grabFlagData(e.payload)
          break;
        case "sched":
          // console.log('grabSchedData')
          grabSchedData(e)
          break;
      }
  });  
}
/*-----------------actions---------------------------------------*/

const LS2storeCurrentApps = actionCreator((payload) => {
  console.log(payload)
  return {
    type: 'GET_LS_CURRENT_APPS',
    payload
  }
});

const getApps = actionCreator((payload)=>{
  var capps =ls.getApps()
  console.log(capps)
  if(capps){
    LS2storeCurrentApps(capps)
  }
  var url = baseURL+'/dedata/apps'
  return {
    type: 'APPS_LOADING',
    payload: Observable.ajax({
      url: url,
      responseType: 'json',
      headers: {
        'Authorization': 'Bearer ' + payload.token
      }
    }).map((xhr)=>{
      console.log(xhr)
      console.log(xhr.response)
      var res = {id: payload.email, 
                apps: xhr.response.apps, 
                status:{auth: xhr.response.auth,
                    message:xhr.response.auth }
                }
      console.log(res) 
      ls.setCurrentApps(res)
      router.navigate('devapps')
      return({
        type: 'APPS_LOADED',
        payload: res
      })
    })
  }
})

const disconnect = actionCreator((payload)=>{
  console.log('disconnection')
  mqtt$.next('end')
  return {
    type: 'DISCONNECT',
    payload: {isConnected: false}
  }
})
const reconnect = actionCreator((payload)=>{
  var shouldConnect = false
  if(payload.includes('/dev/')){
    var ha = payload.split('/dev/')
    var dev= ha[1]
    if (dev.includes('/')){
      var dda = dev.split('/')
      dev=dda[0]
    }
    console.log(dev)
    shouldConnect = true
    connectAndSubscribe(dev)
  }
  return {
    type: 'RECONNECT',
    payload: shouldConnect
  }
})
const changeDevInfo = actionCreator((payload) => {
  console.log(`${storeCopy.mqtt.currentDevId} != ${payload.par.id}`)
  if (storeCopy.mqtt.currentDevId != payload.par.id){
    connectAndSubscribe(payload.par.id)
  }  
  return {
    type: 'DEVINFO_CHANGED',
    payload
  }
});
const changeSenRel = actionCreator((payload) => {
  console.log(payload)
  return{
    type: 'SENREL_CHANGED',
    payload
  }
})
const grabTimrData = actionCreator((payload) => {
  return {
    type: 'TIMR_CHANGED',
    payload
  }
});
const reqSchedData = actionCreator((payload) => {
  //mqtt$.next(`{\"id\":1,\"req\":\"progs\"}`)
  return {
    type: 'REQ_SCHED',
    payload
  }
});
const grabSchedData = actionCreator((payload) => {
  // console.log('inaction grabSchedData')
  let pl={}
  pl.sched = payload.payload
  var sp = payload.topic.split("/")
  const devId = sp[0]
  pl.devId = devId
  return {
    type: 'SCHED_CHANGED',
    payload: pl
  }
});
const grabSrstateData = actionCreator((payload) => {
  return {
    type: 'SRSTATE_CHANGED',
    payload
  }
});
const grabFlagData = actionCreator((payload) => {
  return {
    type: 'FLAGS_CHANGED',
    payload 
  }
});

export {LS2storeCurrentApps, copyStore, changeDevInfo, changeSenRel, grabFlagData, grabSrstateData, grabSchedData, grabTimrData, disconnect, reconnect, getApps}