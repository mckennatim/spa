import { actionCreator } from '../rxred';
import {mqttConnect, mqttEnd} from '../services/interface'

/*-----------------actions---------------------------------------*/

const endMqtt = actionCreator((payload)=>{
  console.log(payload)
  mqttEnd()
  return {
    type: 'END_MQTT',
    payload: {isConnected: 'disconnected'}
  }
})
const connectMqtt = actionCreator((payload)=>{
  console.log('in actions/mqtt.connectMqtt')
  console.log(payload)
  mqttConnect()
  return {
    type: 'CONNECT_MQTT',
    payload: {isConnected: 'connecting'}
  }
})
const grabTimrData = actionCreator((payload) => {
  return {
    type: 'TIMR_CHANGED',
    payload
  }
});
const grabSchedData = actionCreator((payload) => {
  return {
    type: 'SCHED_CHANGED',
    payload
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

export {grabFlagData, grabSrstateData, grabSchedData, grabTimrData, endMqtt, connectMqtt}
