import React from 'react'
import Paho from'paho.mqtt.js'
import {ls, cfg} from '../utilities/getCfg'
import {processMqttMessage} from '../utilities/mq'

let mqttFor=(Comp)=>{// eslint-disable-line no-unused-vars
  return class XP extends React.Component {
    constructor (props){
      super(props);
      let zdat = this.props.zones.map((z)=>{
        return {id:z.id, temp:-99, relay:0, setPt:-99}
      }) 
      this.state= {isRequesting: true, mqdata: [], messge:'no message', zdat:zdat}
      this.client = new Paho.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
      this.client.onConnectionLost =this.onConnectionLost;
      this.client.onMessageArrived = this.onMessageArrived; 
    }
    
    connect=()=>{
      this.client.connect({
        onSuccess: this.onConnect,
        onFailure: function (message) {
          console.log("Connection failed: " + message.errorMessage);
        },
        useSSL: true,
        userName: ls.getKey('email'),
        password: ls.getKey('token')  
      });
    }      
    componentDidMount=()=>{
      this.connect()   
      let m = {messge: 'componentDidMount'}  
      this.setState(m)
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
      let newzones= processMqttMessage(message, this.props.devs, this.state.zdat)
      console.log(newzones)
      this.setState({zdat: newzones})
    } 
       
    render() {
      return (
        <Comp {...this.props} {...this.state} />
      )
    }    
  }
}

export {mqttFor}