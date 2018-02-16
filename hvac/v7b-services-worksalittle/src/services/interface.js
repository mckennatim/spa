import { fromMqtt$} from './fromMqtt';
import{getArrObjByObjKeyVal, getIdxYobj} from '../utilities/wfuncs'
import{grabFlagData, grabSrstateData, grabSchedData, grabTimrData} from '../actions/mqtt'


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
          if(e.payload.ready){
            console.log('THIS SHIT IS READY')
            mqtt$.next({pubsub:'subscribe', topic:'CYURD003/srstate'})
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

const mqttEnd = ()=>{
  mqtt$.next('end')
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



export{mqttConnect, mqttEnd, processMqttMessage}