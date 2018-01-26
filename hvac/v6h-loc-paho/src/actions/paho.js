import PahoMQTT from'paho.mqtt.js'
import {cfg, ls} from '../utilities/getCfg'

const makeMqtt = (gotDataCB, gotMessageCB)=>{
  var devices = ls.getKey('devs')
  var topicsSub = ["srstate", "devtime", "timr", "sched", "flags"]
  var client = new PahoMQTT.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;  
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      gotMessageCB('Connection Lost ' + responseObject.errorMessage);
    }
  }
  function onMessageArrived(message){
    gotDataCB(message)
  } 
  function connect() {
    client.connect({
      onSuccess: onConnect,
      onFailure: function (message) {
        gotMessageCB("Connection failed: " + message.errorMessage);
      },
      useSSL: true,
      userName: ls.getKey('email'),
      password: ls.getKey('token')   
    });
  } 
  function onConnect() {
    var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
    gotMessageCB(cmess) 
    subscribe() 
    publish('presence', 'Web Client is alive.. Test Ping! ')
    devices.map((dev)=>{
      publish(`${dev}/req`,'{"id":2,"req":"flags"}')
      publish(`${dev}/req`,'{"id":0,"req":"srstates"}')
      publish(`${dev}/req`,'{"id":1,"req":"progs"}')       
    })
  }
  function subscribe(){
    devices.map((dev)=>{
      topicsSub.map((toc)=>{
        let p = `${dev}/${toc}`
        client.subscribe(p, {onFailure: subFailure})
      })
    })
  }
  function subFailure(message){
    gotMessageCB(message)
  }
  function publish(topic, payload){
    let message = new PahoMQTT.Message(payload);
    message.destinationName = topic;
    client.send(message)
  } 
  return {
    client,
    connect
  }
}

export {makeMqtt}