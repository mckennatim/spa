import PahoMQTT from'paho.mqtt.js'
import {cfg, ls} from './util/getCfg'
import {aMessageCB} from './app'


const makeMqtt = (devices)=>{
  var dmessage ='duck'
  var topicsSub = ["srstate", "devtime", "timr", "sched", "flags"]
  var client = new PahoMQTT.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;  
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      dmessage='Connection Lost ' + responseObject.errorMessage;
      console.log(dmessage)
    }
  }
  function onMessageArrived(message){
    aMessageCB(message)
  } 
  function connect() {
    client.connect({
      onSuccess: onConnect,
      onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
        dmessage= "Connection failed: " + message.errorMessage;
      },
      useSSL: true,
      userName: ls.getKey('email'),
      password: ls.getKey('token')   
    });
  } 
  function onConnect() {
    var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
    console.log(cmess); 
    dmessage=cmess 
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
    console.log(message)
  }
  function publish(topic, payload){
    let message = new PahoMQTT.Message(payload);
    message.destinationName = topic;
    client.send(message)
  } 
  return {
    client,
    connect,
    dmessage
  }
}

export {makeMqtt}