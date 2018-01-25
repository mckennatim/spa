import Paho from 'paho.mqtt.js'
import {cfg, ls} from '../utilities/getCfg'


const makeMqtt = (devices)=>{
  var client = new Paho.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  function connect() {
  	client.connect({
  		onSuccess: onConnect,
  		onFailure: function (message) {
  	    console.log("Connection failed: " + message.errorMessage);
  	    dmessage.innerHTML= "Connection failed: " + message.errorMessage;
  	  },
  		useSSL: true,
  		userName: ls.getKey('email'),
  		password: ls.getKey('token')
  	});
  }

  function onConnect() {
  	var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
  	console.log(cmess);
  	dmessage.innerHTML=cmess;
  	subscribe()
  	publish('presence', 'Web Client is alive.. Test Ping! ');
  	publish(`${devices[0]}/req`,'{"id":2,"req":"flags"}')
  	publish(`${devices[0]}/req`,'{"id":0,"req":"srstates"}')
  	publish(`${devices[0]}/req`,'{"id":1,"req":"progs"}')
  	publish(`${devices[1]}/req`,'{"id":2,"req":"flags"}')
  	publish(`${devices[1]}/req`,'{"id":0,"req":"srstates"}')
  	publish(`${devices[1]}/req`,'{"id":1,"req":"progs"}')
  }

  function onConnectionLost(responseObject) {
  		if (responseObject.errorCode !== 0) {
  			console.log('Connection Lost ' + responseObject.errorMessage);
  		}
  }
  function subscribe() {
  	console.log(client)
  	client.subscribe(`${devices[0]}/srstate` , {onFailure: subFailure})
  	client.subscribe(`${devices[0]}/devtime` , {onFailure: subFailure})
  	client.subscribe(`${devices[0]}/timr` , {onFailure: subFailure})
  	client.subscribe(`${devices[0]}/sched` , {onFailure: subFailure})
  	client.subscribe(`${devices[0]}/flags` , {onFailure: subFailure})
  	client.subscribe(`${devices[1]}/srstate` , {onFailure: subFailure})
  	client.subscribe(`${devices[1]}/devtime` , {onFailure: subFailure})
  	client.subscribe(`${devices[1]}/sched` , {onFailure: subFailure})
  	client.subscribe(`${devices[1]}/timr` , {onFailure: subFailure})
  	client.subscribe(`${devices[1]}/flags` , {onFailure: subFailure})
  }

  function subFailure(message){
  	console.log(message)
  }

  function subSuccess(message){
  	console.log(message.grantedQos[0])
  }

  function publish(topic, payload){
  	message = new Paho.MQTT.Message(payload);
  	message.destinationName = topic;
  	client.send(message)
  }
  function onMessageArrived(message) {
  	var topic = message.destinationName
  	var pls = message.payloadString
  	console.log(topic+ pls)
  	var plo = JSON.parse(pls)
  	console.log(plo)
  	// console.log('['+topic+'] '+pls)
  }


  return {
    client,
    connect,
    onConnect,
    onConnectionLost
  }
}

export{ makeMqtt}
