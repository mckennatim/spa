import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/from';
import { isObservable } from '../utilities/ofuncs';
import { fromMqtt$} from './fromMqtt';
import{getArrObjByObjKeyVal} from '../utilities/wfuncs'
import{qreducer} from './qreducer'

const action$ = new Subject();

const qactionCreator = (func) => (...args) => {
  const action = func.call(null, ...args);
  action$.next(action);
  if (isObservable(action.payload))
    action$.next(action.payload);
  return action;
};

const qcreateStore = (initState) =>
  action$
    .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
    .startWith(initState)
    .scan(qreducer);


/*----------for setting up qstore and listeners in comonentDidMount-------*/

let mqttStore

const createMqttStore=(devs,qdata,tz)=>{
  let initstate = {devs, qdata, tz:tz}
  mqttStore = qcreateStore(initstate)
}

const getMqttStore=()=>mqttStore

/*---------for managing mqtt------------------------*/

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
          // console.log(JSON.stringify(e))
          qstatus.setReady(e.payload.ready)
          if(e.payload.ready){
            mqtt$nextSubscribe()
            mqtt$nextPublishReqs()
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
          grabSchedData(e)
          break;
      }
  });
}

const mqttEnd = ()=>{
  mqtt$.next('end')
  qstatus.setReady(false)
}

const mqttReq = ()=>{
  mqtt$nextPublishReqs()
}

/*--------forming qdata from devs and zones; updating and accessing it----------

BTW cmd changes the current state(a boost) which lasts until the next schedule change.
CYURD001/cmd {"id":0,"sra":[84,72]}
-----------*/
let subtopics= ["srstate", "sched", "flags", "devtime"]
//reqs= [`{\"id\":0,\"req\":\"srstates\"}`, `{\"id\":1,\"req\":\"progs\"}`]
let reqs= [{id:0, req:"srstates"}, {id:1,req:"progs"}]
let subscriptions = []
let pubreqs = []
let devscopy= {}// eslint-disable-line no-unused-vars

const createSubscriptions=(devs)=>{
  let subs=[]
  Object.keys(devs).map((dev)=>{
    subtopics.map((s)=>{
      let o={pubsub:'subscribe'}
      o.topic =`${dev}/${s}`
      subs.push(o)
    })
  })
  subscriptions = subs
  return(subscriptions)
}
  
const mqtt$nextSubscribe=()=>{
  subscriptions.map((sub)=>{
    mqtt$.next(sub)
  })
}
const mqtt$nextPublishReqs=()=>{
  pubreqs.map((pub)=>{
    mqtt$.next(pub)
  })
}

const createStartupPubreqs = (devs)=>{
  let pubs=[]
  Object.keys(devs).map((dev)=>{
    reqs.map((r)=>{
      let o={pubsub:'publish'}
      o.topic =`${dev}/req`
      o.message = JSON.stringify(r)
      pubs.push(o)
    })
  })
  pubreqs = pubs
  // console.log(pubreqs[0].message)  
}

const lsDevsQdataRetQdata=(devs,zones,tz,ls)=>{
  let qdata = createBlankQdata(devs, zones)
  ls.modItem("devs", devs)
  ls.modItem("qdata", qdata)
  ls.modItem("tz", tz)
  return qdata  
}

const setupMqttStore=(devs, qdata, tz)=>{
  createSubscriptions(devs)
  createStartupPubreqs(devs)
  createMqttStore(devs, qdata,tz)
}

const hookupMqtt=(loc, ls, cb)=>{
  let devs = ls.getKey('devs')
  let qdata = ls.getKey('qdata')
  let cloc = ls.getKey("cloc")
  let tz = ls.getKey("tz")
  let unsub
  let haystore=false
  let mqttStore = getMqttStore()
  if(mqttStore){
    haystore=true
  } else if(cloc==loc && devs && qdata){
    setupMqttStore(devs, qdata, tz) 
    haystore=true
    mqttStore = getMqttStore()    
  }
  if(haystore){
    unsub = mqttStore
      .subscribe((state)=>{
        cb(state)
      }
    )     
  }
  return unsub
}

const createBlankQdata = (devs, zones)=>{
  let odata = {}
  zones.map((zone)=>{
    odata[zone.id]={id:zone.id, name:zone.name, img:zone.img,
      spec:{type:"temp", diff: 2},
      sr:{temp:44, relay:0, setpt:68, id:0, dev:"CYURD"},
      sched:[[]],
      timeleft:0,
      ts:0
    }
  })
  return odata
}

const qdataAsArray=(qdata)=>{
  return Object.entries(qdata).map( (res)=>res[1])
}

const srUpdateQdata=(state, message)=>{
  let devid=message.topic.split('/')[0] 
  let sYl =getArrObjByObjKeyVal('sr', message.payload.id , state.devs[devid]) 
  if(sYl){
    let zoi = state.qdata[sYl.label]
    // console.log('zoi: ',JSON.stringify(zoi))
    if(zoi){
      zoi.ts = new Date()
      zoi.sr.temp = message.payload.darr[0]
      zoi.sr.relay = message.payload.darr[1]
      zoi.sr.setpt = Math.floor((message.payload.darr[2]+message.payload.darr[3])/2)
      zoi.sr.id = message.payload.id
      zoi.sr.dev = devid
      state.qdata[sYl.label]=zoi
      return state 
    }else{
      return state
    }
  }else {
    return state
  }  
}

const schedUpdateQdata=(state, message)=>{
  let devid=message.topic.split('/')[0] 
  let sYl =getArrObjByObjKeyVal('sr', message.payload.id , state.devs[devid])
  if(sYl){
    let zoi = state.qdata[sYl.label]
    if(zoi){
      zoi.ts = new Date()
      zoi.sched = message.payload.pro
      state.qdata[sYl.label]=zoi
      return state 
    }else{
      return state
    }
  }else {
    return state
  }

}

/*-------------dealing with mqttconnection on focus, page change and mount----------*/

var qstatus=(()=>{
  let ready =false
  const qpages = ["AtLoc", "SensorRelay", "TimerCtrl", "DaySched"]
  const setReady = (tf)=>{ready=tf}
  return{
    setReady: setReady,
    // hello: ()=>console.log('hello world'),
    getReady: ()=>ready,
    getQpages: ()=>qpages
  }  
})()

const qOnMount = ()=>{
  let ready =qstatus.getReady()
  // console.log('qOnMount, ready: ',ready)
  if (!ready){
    mqttConnect()
  }
}

const qOnPageSwitch = (to)=>{
  let qpages =qstatus.getQpages()
  let ready =qstatus.getReady()
  let arriving2q  = qpages.includes(to)
  // console.log('qOnPageSwitch, to:', to,arriving2q, ' ready:', ready  )
  if(!arriving2q && ready){
    // console.log('!arriving2q && ready: ',JSON.stringify(  !arriving2q && ready))
    mqttEnd()
  }else if(arriving2q && ready){
    // console.log(' arriving2q && ready: ',JSON.stringify(  arriving2q && ready))  
    mqttReq()
  }
}

const qOnFocus = (to, frum, focused)=>{
  let qpages =qstatus.getQpages()
  let ready =qstatus.getReady()
  let arriving2q  = qpages.includes(to)
  // let leavingQ = qpages.includes(frum)
  // console.log('qOnFocus, ready:', ready, ' focused:', focused, ' arriving2q:', arriving2q)
  if(arriving2q  && focused && !ready){
    // console.log('arriving2q && focused -> mqttConnect')
    mqttConnect()
  } else if(!focused){
    // console.log('!focused -> mqttEnd')
    mqttEnd()
  } 
}

/*------------------actions-----------------------*/

const grabSrstateData = qactionCreator((payload)=>{
  // console.log('grabSrstateData: ',JSON.stringify(payload))
  return{
    type: 'SRSTATE_CHANGED',
    payload
  }
})
const grabSchedData = qactionCreator((payload)=>{
  // console.log('grabSchedData: ',JSON.stringify(payload))
  return{
    type: 'SCHED_CHANGED',
    payload
  }
})

export{ srUpdateQdata, schedUpdateQdata, qOnFocus, qdataAsArray, qOnMount, qOnPageSwitch,  setupMqttStore,lsDevsQdataRetQdata, hookupMqtt, createBlankQdata, createSubscriptions }