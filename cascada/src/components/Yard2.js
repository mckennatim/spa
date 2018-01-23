var React = require('react');
var Spots = require('./Spots');
var Paho = require('paho.mqtt.js')
import {cfg} from '../utilities'




class Yard2 extends React.Component{
  constructor(props) {
    super(props);
    console.log(props.user.email)
    this.state={spots: {"pond": {"spot": "pond", "tleft": -99, "state": "off", "pro":[]}, "center": {"spot": "center", "tleft": -99, "state": "off"}, "bridge": {"spot": "bridge", "tleft": -99, "state": "off"}}, authorized:props.user.auth};
		this.client = new Paho.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
		this.client.onConnectionLost =this.onConnectionLost;
		this.client.onMessageArrived = this.onMessageArrived;    
	  window.onfocus = ()=>{
			console.log('focused')
			this.connect()
		}

		window.onblur= ()=>{
			console.log('unfocused')
			try{
				this.client.disconnect()
			}catch(err){
				console.log(err)
			}
		}
	}

	handleUserInput=(timerSet)=>{
		console.log('handleing user input')
		console.log(timerSet)
		if (this.state.authorized){
			console.log(timerSet)
			this.sendProg(timerSet);
		} else {
			console.log('yo not authorized')
		}		
	}

	sendProg =(timerset)=>{
		var prg = `${cfg.devices[0]}/prg`
		var sten, id, ev, numdata, pro;
		if (timerset.til>0){
			sten = this.calcStartNow(timerset.til);
			ev=2;
		}else{
			var onoff = 0;
			if (timerset.state=="on"){onoff=1;}
			sten = [[0,0,onoff]]
			ev=1;
		}
		pro = JSON.stringify(sten)
		switch(timerset.spot){
			case "pond": id = 4; break;
			case "bridge": id = 3; break;
			case "center": id = 2; break;
		}
		numdata=1;
		var thecmd =`{"id":${id},"pro":${pro}}`;
		console.log(thecmd)
		this.publish(prg, thecmd)
	}
	calcStartNow =(til)=>{
		var da = new Date()
		var sh =da.getHours()
		var sm =da.getMinutes()
		var m0 = til*1+sm*1
		var m = m0%60;
		var mm = (90+16)%60;
		var h = (m0 -m)/60+sh
		var ret = [[sh,sm,1],[h,m,0]];
		return ret
	}
	connect=()=> {
		//check ls or use default
		this.client.connect({
			onSuccess: this.onConnect,
			onFailure: function (message) {
		    console.log("Connection failed: " + message.errorMessage);
		    //dmessage.innerHTML= "Connection failed: " + message.errorMessage;
		  },
			useSSL: true,
			userName: this.props.user.email,
			password: this.props.user.token		
		});
	}

	onConnect = ()=>{
		var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
		console.log(cmess);	
		this.publish('presence', 'Web Client is alive.. Test Ping! ');
		this.subscribe()
		var req = `${cfg.devices[0]}/req`
		var user = `${cfg.devices[0]}/user`
		var umess= `{"user":"${this.props.user.email}","appId":"${cfg.appid}"}`
		console.log(user, umess)
		this.publish(user, umess)
		this.publish(req, '{"id":3,"req":"timr"}')
		this.publish(req, '{"id":1,"req":"progs"}')
	}

	publish=(topic, payload)=>{
		var message = new Paho.Message(payload);
		message.destinationName = topic;
		this.client.send(message)
	}	

	subscribe=()=> {
		this.client.subscribe(`${cfg.devices[0]}/devtime` , {onFailure: this.subFailure}) 
		this.client.subscribe(`${cfg.devices[0]}/timr` , {onFailure: this.subFailure}) 
		this.client.subscribe(`${cfg.devices[0]}/sched` , {onFailure: this.subFailure}) 
		this.client.subscribe(`${cfg.devices[0]}/flags` , {onFailure: this.subFailure}) 
		this.client.subscribe(`${cfg.devices[0]}/userInf` , {onFailure: this.subFailure}) 
	}

	subFailure=(message)=>{
		console.log('subscribe failure',message)
	}

	onMessageArrived = (message)=>{
		var topic = message.destinationName
		var pls = message.payloadString
		//console.log(topic+ pls)
		var plo = JSON.parse(pls)
		//console.log(plo)
		console.log('['+topic+'] '+pls)
	  var sp = topic.split("/")
	  var job = sp[1];
	  var dev =sp[0]
		var newstate = Object.assign({}, this.state)
    switch(job){
			case "timr":
				var tleft4 = plo.tIMElEFT[4]
				if(tleft4>0){
					newstate.spots.pond.tleft = this.convertTleft(tleft4);
					newstate.spots.pond.state = "timer"
				}else{
					newstate.spots.pond.tleft = -1;
					newstate.spots.pond.state = "off"
				}
				var tleft2 = plo.tIMElEFT[3]
				if(tleft2>0){
					newstate.spots.bridge.tleft = this.convertTleft(tleft2);
					newstate.spots.bridge.state = "timer"
				}else{
					newstate.spots.bridge.tleft = -1;
					if((plo.ISrELAYoN & 8) == 8){
						newstate.spots.bridge.state = "on"
					}else {
						newstate.spots.bridge.state = "off"
					}
				}
				var tleft3 = plo.tIMElEFT[2]
				if(tleft3>0){
					newstate.spots.center.tleft = this.convertTleft(tleft3);
					newstate.spots.center.state = "timer"
				}else{
					newstate.spots.center.tleft = -1;
					if((plo.ISrELAYoN & 4) == 4){
						newstate.spots.center.state = "on"
					}else {
						newstate.spots.center.state = "off"
					}
				}
				break;
			case "sched":
				//console.log(plo)
				if (plo.id==4){
					newstate.spots.pond.pro = plo.pro
				}
				break	
			case "userInf":
				newstate.authorized = plo.canPublish
				break					
    };			
		this.setState(newstate)	
	}

	convertTleft= (tleft)=>{
		var ans = Math.floor(tleft/60)+":"+tleft%60
		return ans
	}

	onConnectionLost=(responseObject)=> {
		if (responseObject.errorCode !== 0) {
			console.log('Connection Lost ' + responseObject.errorMessage);
		}
	}	

	componentDidMount= ()=> {
		console.log('yard mounted')
		this.connect()
	}

	render(){
	  return(  
	  	<div>
				<Spots spots={this.state.spots} relayUserInput={this.handleUserInput} auth={this.state.authorized} user={this.props.user.email}/>	  		
	  	</div>
	  )
	}
}

export {Yard2}

