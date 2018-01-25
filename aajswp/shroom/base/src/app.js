import {makeMqtt} from './paho'
import appHtml from './app.html'
import {cfg} from './util/getCfg'
import {el} from './util'

const container = document.getElementById('app');
container.innerHTML = appHtml

var dmessage = el('dmessage')

const mq = makeMqtt(cfg.devices)
mq.connect()

const aMessageCB = (message)=>{
  let nmes=`[${message.destinationName}]${message.payloadString}`
  console.log(nmes)
  dmessage.innerHTML= nmes
}

export{aMessageCB}