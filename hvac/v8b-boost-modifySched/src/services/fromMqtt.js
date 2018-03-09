var Paho = require('paho.mqtt.js')
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {ls, cfg} from '../utilities/getCfg'

const fromMqtt=()=>{
  let observer
  //let client
  const client = new Paho.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
  const publish=(payload)=>{
    var message = new Paho.Message(payload.message);
    message.destinationName = payload.topic;
    client.send(message)
  }
  const subscribe=(data) => {
    client.subscribe(data.topic)
  } 

  const observable = Observable.create ((obs)=> {

    const onConnect=()=> {
      // var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
      // console.log(cmess)
      obs.next({
        topic: 'any/ready',
        payload: {ready: true}
      })
    }
    const connect=() => {
      client.connect({
        onSuccess: onConnect,
        onFailure: function (message) {
          console.log("Connection failed: " + message.errorMessage);
        },
        useSSL: true,
        userName: ls.getKey('email'),
        password: ls.getKey('token')  
      }); 
    }    
    const onMessageArrived=(message) => {
      var topic = message.destinationName
      var pls = message.payloadString
      var plo = JSON.parse(pls)
      obs.next({
        topic: topic,
        payload: plo
      })
    }
    const onConnectionLost=(responseObject) =>{
      obs.next({
        topic: 'any/ready',
        payload: {ready: false}
      })
        if (responseObject.errorCode !== 0) {
          // console.log('Connection Lost ' + responseObject.errorMessage);
          // console.log('Connection Lost ');
        }
    }


    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    connect()
  })
  observer = {
    next: (data)=>{
      if (data=='end'){
        client.disconnect()
      }else{
        let ps = data.pubsub
        if (ps=='publish'){
          publish(data)
        }else if(ps == 'subscribe'){
          subscribe(data)
        }
      }
    }
  }  
  return Subject.create(observer, observable);  
}
const fromMqtt$ =()=>fromMqtt()

export {fromMqtt$}