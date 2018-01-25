// var Paho = require('paho.mqtt.js')
import Paho from 'paho.mqtt.js'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import Rx from 'rxjs';
//http://www.eclipse.org/paho/files/jsdoc/symbols/Paho.MQTT.Client.html
var url="services.sitebuilt.net/geniot/ws"
var port=3333
var conname = "pahoSB"+Math.random()*1000000

function fromMqtt(connectObserver, url, port, devId){
	var tmr, progs, cmd, prg, req, trigtime, devtime, sched, client, srstate,flags,timr;
	var deviceId = devId
	var connected=false;
	//publish to device
	prg = deviceId+'/prg'
	cmd = deviceId +'/cmd'
	req = deviceId +'/req'
	//publish to server
	trigtime = deviceId +'/time'
	//subscribe
	devtime = deviceId +'/devtime'
	srstate = deviceId+'/srstate'
	sched = deviceId +'/sched'
	flags = deviceId+'/flags'
	//deprecate
	timr = deviceId+'/timr'

	function publish(topic, payload){
		var message = new Paho.MQTT.Message(payload);
		message.destinationName = topic;
		client.send(message)
	}
	client = new Paho.Client(url, port, conname);
	console.log(url, port, conname);
  const observable = Observable.create (function (obs) {
	  if (connectObserver) {
			function onConnect() {
				console.log('Connected to Sitebuilt.net:3333!');
	      obs.next({
	      	topic: 'any/ready',
	      	payload: {ready: true}
	      })
	      subscribe()
			}
			function subscribe() {
				client.subscribe(devtime)//device time
				client.subscribe(srstate)
				client.subscribe(timr)
				client.subscribe(sched)
				client.subscribe(flags)
		    connectObserver.next();
		    connectObserver.complete();
			}
			function onMessageArrived(message) {
				var topic = message.destinationName
				var pls = message.payloadString
				var plo = JSON.parse(pls)
				//console.log(plo)
				console.log('['+topic+'] '+pls)
	      obs.next({
	      	topic: topic,
	      	payload: plo
	      })
			}
			function connect() {
				client.connect({onSuccess:onConnect, useSSL:true});
			}

			function onConnectionLost(responseObject) {
				obs.next({
	      	topic: 'any/ready',
	      	payload: {ready: false}
	      })
					if (responseObject.errorCode !== 0) {
						console.log('Connection Lost ' + responseObject.errorMessage);
					}
			}

			client.onConnectionLost = onConnectionLost;
			client.onMessageArrived = onMessageArrived;
			connect()
	  }
	})
  let observer = {
  	next: (data)=>{
  		if (data=='end'){
				connected=false
        client.disconnect()
  		}else{
	  		publish(req, data)
  		}
  	}
  }
	return Subject.create(observer, observable);
}

const Observer = {
	next(value) {},
	error(err) {throw err;},
	complete() {}
}
const fromMqtt$ = (devId)=>fromMqtt(Observer, url, port, devId)

export {fromMqtt$}
