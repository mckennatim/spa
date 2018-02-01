import {ls} from '../utilities/getCfg'

const devs = ls.getKey("devs")
const zones = ls.getKey("zones")

const processMessage = (message, cb ) =>{
  let nmes=`[${message.destinationName}]${message.payloadString}`// eslint-disable-line no-unused-vars
  if(!devs || !zones){
    cb({message:"no devs or zones go back to locations"})
  }else{
    const devtopic = message.destinationName.split('/')
    const device = devtopic[0]
    const topic =devtopic[1]
    const qata = JSON.parse(message.payloadString)
    switch(true){
      case topic=='srstate':
        //console.log(qata.darr)
        //console.log(topic)
        let out ={}
        devs[device].map((x)=>{
          if(x.sr==qata.id){
            out[x.label]={temp:qata.darr[0], rstate:qata.darr[1], setpt:qata.darr[3]+1}
            cb(out)
          }
        })
        break
      default :
    }  
  }
}

export{processMessage}