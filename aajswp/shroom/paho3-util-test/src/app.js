import {makeMqtt} from './paho'
import appHtml from './app.html'
import {el} from './util/wfuncs'

const container = document.getElementById('app');
container.innerHTML = appHtml

var dmessage = el('dmessage')
var mdata = el('mdata')

const mq = makeMqtt()
mq.connect()

const gotDataCB = (thedata)=>{
  let nmes=`[${thedata.destinationName}]${thedata.payloadString}`
  // console.log(nmes)
  mdata.innerHTML= nmes
}

const gotMessage= (message)=>{
  dmessage.innerHTML = message
}

export{gotDataCB, gotMessage}