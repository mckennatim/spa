import React from 'react'
import Paho from'paho.mqtt.js'
import {ls, cfg} from '../utilities/getCfg'
import {processMqttMessage} from '../utilities/mq'
import {setFocus} from '../actions/responsive'
import {getArrObjByObjKeyVal} from '../utilities/wfuncs'

let mqttFor=(Comp)=>{// eslint-disable-line no-unused-vars
  return class XP extends React.Component {
    constructor (props){
      super(props);
      // console.log(JSON.stringify(this.props))
      this.devids=Object.keys(this.props.devs)
      this.topics=[
        {"id":2,"req":"flags"},
        {"id":0,"req":"srstates"},
        {"id":1,"req":"progs"},
        {"id":3,"req":"timr"}
      ]
      let zdat = this.props.zones.map((z)=>{
        return {id:z.id, temp:-99, relay:0, setPt:-99, sched:[]}
      }) 
      this.state= {isRequesting: true, mqdata: [], messge:'no message', zdat:zdat}
      this.client = new Paho.Client(cfg.mqtt_server, cfg.mqtt_port, cfg.appid+Math.random());
      this.client.onConnectionLost =this.onConnectionLost;
      this.client.onMessageArrived = this.onMessageArrived; 
      this.connected=false
      this.mounted=false
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
      //this.connect()   
      let m = {messge: 'componentDidMount'}  
      this.setState(m)
      setFocus({infocus: true})
      this.mounted=true
    }

    componentWillUnmount=()=>{
      console.log('mqttFor(Zones) will unmount')
      this.mounted=false
      this.client.disconnect()
    }

    componentWillUpdate=(nextProps, nextState)=> {
      if(nextProps.zones.length>1 && !nextProps.page.params.sr && nextState.zdat.length==1){
        let nzdat = nextProps.zones.map((z)=>{
          return {id:z.id, temp:-99, relay:0, setPt:-99, sched:[]}
        })
        console.log('nzdat: ',JSON.stringify(nzdat))
        this.setState({zdat: nzdat})
        this.refreshReq('srstates')    
        this.refreshReq('progs') 
      }
      // console.log('this.state: ',JSON.stringify(this.state))
    }

    subscribe=()=> {
      this.devids.map((devid)=>{
        this.client.subscribe(`${devid}/srstate` , {onFailure: this.subFailure}) 
        this.client.subscribe(`${devid}/sched` , {onFailure: this.subFailure}) 
      })
    }

    subFailure=(message)=>{
      console.log('subscribe failure',message)
    }    

    publish=(topic, payload)=>{
      var message = new Paho.Message(payload);
      message.destinationName = topic;
      this.client.send(message)
    }

    refreshReq=(topic)=>{
      let ob =getArrObjByObjKeyVal('req', topic, this.topics)
      this.devids.map((devid)=>{
        this.publish(`${devid}/req`,`{"id":${ob.id},"req":"${ob.req}"}`)
      })      

    }

    onConnect=()=>{
      var cmess = `Connected to ${cfg.mqtt_server} on port ${cfg.mqtt_port} `
      console.log(cmess)
      this.connected=true
      this.publish('presence', 'Web Client is alive.. Test Ping! ');
      this.subscribe()
      this.refreshReq('srstates')    
      this.refreshReq('progs') 
    }

    onConnectionLost=(responseObject)=> {
      this.connected=false
      console.log('Disconnected in mqttFor')
      if (responseObject.errorCode !== 0) {
        console.log('Connection Lost ' + responseObject.errorMessage);
      }
    }  
    onMessageArrived=(message)=>{
      let newzdat= processMqttMessage(message, this.props.devs, this.state.zdat)
      this.setState({zdat: newzdat})
    } 

    refreshMqtt=()=>{
      this.refreshReq('srstates')    
      this.refreshReq('progs')    
    }
       
    render() {
      // console.log('infocus: ',this.props.infocus, ' connected: ',this.connected)
      if(this.mounted && this.props.infocus && !this.connected){
        this.connect()
      }else if(!this.props.infocus && this.connected) {
        this.client.disconnect()
      }
      return (
        <Comp {...this.props} {...this.state} mqRefresh={this.refreshMqtt}/>
      )
    }    
  }
}

export {mqttFor}