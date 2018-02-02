import{getArrObjByObjKeyVal, getIdxYobj} from './wfuncs'

const srUpdateZones=(devid, payload, devs, zones)=>{
  console.log(payload)
  let sYl =getArrObjByObjKeyVal('sr', payload.id , devs[devid])
  if(sYl){
    console.log('syl', sYl, )
    let zoi = getIdxYobj('id', sYl.label, zones)
    zoi.obj.temp = payload.darr[0]
    zoi.obj.relay = payload.darr[1]
    zoi.obj.setPt = Math.floor((payload.darr[2]+payload.darr[3])/2)
    zoi.obj.ts = new Date()
    var newzones =zones.slice(0)
    newzones[zoi.idx]=zoi.obj
    return(newzones)
  }else {
    return zones
  }
}

const processMqttMessage = (mess, devs, zones)=>{
  let dt = mess.destinationName.split('/')
  let devid = dt[0]
  let topic = dt[1]
  let payload = JSON.parse(mess.payloadString)
  console.log(devid, topic, mess.payloadString, payload.id)
  switch(topic) {
    case "srstate" :
      return srUpdateZones(devid, payload, devs, zones)
    default:
      return zones  
  } 
}

export{srUpdateZones, processMqttMessage}

// const devs = ls.getKey("devs")
// const zones = ls.getKey("zones")

// const processMessage = (message, cb ) =>{
//   let nmes=`[${message.destinationName}]${message.payloadString}`// eslint-disable-line no-unused-vars
//   if(!devs || !zones){
//     cb({message:"no devs or zones go back to locations"})
//   }else{
//     const devtopic = message.destinationName.split('/')
//     const device = devtopic[0]
//     const topic =devtopic[1]
//     const qata = JSON.parse(message.payloadString)
//     switch(true){
//       case topic=='srstate':
//         //console.log(qata.darr)
//         //console.log(topic)
//         let out ={}
//         devs[device].map((x)=>{
//           if(x.sr==qata.id){
//             out[x.label]={temp:qata.darr[0], rstate:qata.darr[1], setpt:qata.darr[3]+1}
//             cb(out)
//           }
//         })
//         break
//       default :
//     }  
//   }
// }

