var PahoMQTT = require('paho.mqtt.js')
import appHtml from './app.html'

const container = document.getElementById('app');
container.innerHTML = appHtml


const cfg = {
  "appid": "shroom",  
  "devices": ["CYURD006", "CYURD003"],
  "cbPath": "",     
  "mqtt_server": "services.sitebuilt.net/iotb/wss",
  "mqtt_port": 4333,
  "soauth": "https://services.sitebuilt.net/soauth",
  "api": "https://services.sitebuilt.net/iotex/api"
}

const cred = {"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNocm9vbSIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.1n8rVxF5G-78H0KnsyEYTlZhMC6wdMYeu5rVnpzLN3o"}

var client = new PahoMQTT.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var userEmail=cred.email
var userToken=cred.token
var dmessage = document.getElementById('dmessage')


connect()




console.log(userEmail)

function connect() {
  client.connect({
    onSuccess: onConnect,
    onFailure: function (message) {
      console.log("Connection failed: " + message.errorMessage);
      dmessage.innerHTML= "Connection failed: " + message.errorMessage;
    },
    useSSL: true,
    userName: userEmail,
    password: userToken   
  });
}

function onConnect() {
  var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
  console.log(cmess);
  dmessage.innerHTML=cmess;
  subscribe()
  publish('presence', 'Web Client is alive.. Test Ping! ')
  publish(`${cfg.devices[0]}/req`,'{"id":2,"req":"flags"}')
  publish(`${cfg.devices[0]}/req`,'{"id":0,"req":"srstates"}')
  publish(`${cfg.devices[0]}/req`,'{"id":1,"req":"progs"}')       
  publish(`${cfg.devices[1]}/req`,'{"id":2,"req":"flags"}')
  publish(`${cfg.devices[1]}/req`,'{"id":0,"req":"srstates"}')
  publish(`${cfg.devices[1]}/req`,'{"id":1,"req":"progs"}')   
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection Lost ' + responseObject.errorMessage);
    }
} 


function subscribe() {
  client.subscribe(`${cfg.devices[0]}/srstate` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[0]}/devtime` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[0]}/timr` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[0]}/sched` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[0]}/flags` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[1]}/srstate` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[1]}/devtime` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[1]}/sched` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[1]}/timr` , {onFailure: subFailure}) 
  client.subscribe(`${cfg.devices[1]}/flags` , {onFailure: subFailure}) 
}

function subFailure(message){
  console.log(message)
}

function publish(topic, payload){
  let message = new PahoMQTT.Message(payload);
  message.destinationName = topic;
  client.send(message)
} 

function onMessageArrived(message) {
  var topic = message.destinationName
  var pls = message.payloadString
  var plo = JSON.parse(pls)
  console.log(plo)
  console.log('['+topic+'] '+pls)
  var sp = topic.split("/")
  var job = sp[1];
  var dev =sp[0]
  switch(job){
    case "srstate":
      if (plo.id==0 && dev==cfg.devices[0]){
        console.log('outside is', plo.darr[0])
      }
      if (plo.id==0 && dev==cfg.devices[1]){
        console.log('greenhouse temp is', plo.darr[0])
      }
      if (plo.id==1 && dev==cfg.devices[1]){
        console.log('greenhouse humid is', plo.darr[0])
      }             
      if (plo.id==2 && dev==cfg.devices[1]){
        console.log('lstate is', plo.darr[0])
      }
      break;
    case "timr":
          document.getElementById('greenTleft').innerHTML=Math.round(plo.tIMElEFT[2]/60)
      break;
    case "sched":
      break;
    case "flags":
      // oflags = plo;
      //console.log(JSON.stringify(oflags))
      break;
  }       
} 