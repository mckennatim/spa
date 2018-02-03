import React from 'react'
import Paho from'paho.mqtt.js'
// import {geta} from '../utilities/wfuncs'
import {ls, cfg} from '../utilities/getCfg'
import {processMqttMessage} from '../utilities/mq'
// import {makeMqtt} from '../actions/paho'

// const devs = ls.getKey("devs")
// const zones = ls.getKey("zones")

let mqttFor=(Comp)=>{// eslint-disable-line no-unused-vars
  //outside vars needed, check if they are here or  just add a message to state
  //long lived
  // console.log(cfg)//cfg.mqtt_server, cfg.mqtt_port, cfg.appid
  // var topicsSub = ["srstate", "devtime", "timr", "sched", "flags"]
  // //short lived
  // console.log(ls)//ls.getKey('email'),ls.getKey('token')
  // var devices = Object.keys(ls.getKey('devs'))
  // //derived
  // var subscriptions
  // var publications
  // var outputObject //shape

  return class XP extends React.Component {
    constructor (props){
      super(props);
      this.state= {isRequesting: true, mqdata: [], messge:'no message', zones:this.props.zones}
      this.client = new Paho.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
      this.client.onConnectionLost =this.onConnectionLost;
      this.client.onMessageArrived = this.onMessageArrived; 
      console.log(props)   
    }
    
    connect=()=>{
      //run on cdm
      this.client.connect({
        onSuccess: this.onConnect,
        onFailure: function (message) {
          console.log("Connection failed: " + message.errorMessage);
          //dmessage.innerHTML= "Connection failed: " + message.errorMessage;
        },
        useSSL: true,
        userName: ls.getKey('email'),
        password: ls.getKey('token')  
      });
    }      
    componentDidMount=()=>{
      console.log('mgttFor cdm')
      this.connect()   
      let m = {messge: 'componentDidMount'}  
      this.setState(m)
      console.log(this) 
    }

    subscribe=()=> {
      this.client.subscribe(`CYURD003/srstate` , {onFailure: this.subFailure}) 
      this.client.subscribe(`CYURD001/srstate` , {onFailure: this.subFailure}) 
    }

    subFailure=(message)=>{
      console.log('subscribe failure',message)
    }    

    publish=(topic, payload)=>{
      var message = new Paho.Message(payload);
      message.destinationName = topic;
      this.client.send(message)
    }             

    onConnect=()=>{
      var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
      //var m = {message:cmess}
      console.log(cmess)
      this.publish('presence', 'Web Client is alive.. Test Ping! ');
      this.subscribe()
      this.publish(`CYURD003/req`,'{"id":0,"req":"srstates"}')
      this.publish(`CYURD001/req`,'{"id":0,"req":"srstates"}')
    }

    onConnectionLost=(responseObject)=> {
      if (responseObject.errorCode !== 0) {
        console.log('Connection Lost ' + responseObject.errorMessage);
      }
    }  
    onMessageArrived=(message)=>{
      //let nmes=`[${message.destinationName}]${message.payloadString}`
      // console.log(this.props.zones)
      let newzones= processMqttMessage(message, this.props.devs, this.props.zones)
      this.setState({zones: newzones})
      // console.log(this.props.zones)
      // this.setState({outp:message.payloadString})
      // console.log(this.state)
    } 
       
    render() {
      const {infocus} = this.props
      console.log(infocus)
      console.log(this.props)
      console.log(this.state)
      return (
        <Comp {...this.props} {...this.state} />
      )
    }    
  }
}

export {mqttFor}