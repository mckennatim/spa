import{getArrObjByObjKeyVal, getIdxYobj} from './wfuncs'

const srUpdateZdat=(devid, payload, devs, zdat)=>{
  // console.log(devs[devid])
  // console.log(payload.id)
  let sYl =getArrObjByObjKeyVal('sr', payload.id , devs[devid])
  // console.log(sYl)
  if(sYl){
    let zoi = getIdxYobj('id', sYl.label, zdat)
    // console.log(zoi)
      if(zoi.obj){
      let nzoi = {}
      nzoi.id = zoi.obj.id
      nzoi.temp = payload.darr[0]
      nzoi.relay = payload.darr[1]
      nzoi.setPt = Math.floor((payload.darr[2]+payload.darr[3])/2)
      nzoi.ts = new Date()
      var newzdat =zdat.slice(0)
      newzdat[zoi.idx]=nzoi
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
    default:
      return zdat  
  } 
}

export{processMqttMessage}

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

