import React from 'react';
import DeviceAppList from './DeviceAppList'
import {LS2storeCurrentApps} from '../actions'
import { ls} from '../utilities/getCfg'

class DevicesApps extends React.Component{
  constructor(props) {
    super(props);
    console.log(props)
  } 
  componentDidMount= ()=>{
    this.handleGetApps()
  }
  handleGetApps=()=>{
    var capps =ls.getApps()
    if(capps){
      LS2storeCurrentApps(capps)
    }     
  }

  render(){
    return(
      <div>
        <div style={styles.outer} >
          <h4>in Devices {this.props.name}</h4>
          <button onClick={this.handleGetApps}>get apps</button>
          <DeviceAppList name={this.props.name} devices={this.props.devices} />
        </div>
      </div>
      )   
  } 
}
function mapStoreToProps(anElement){
  //returns a function called later with store as its arg and anElement from here
  return (store)=>{  
    //console.log(store)
    const props= {
        devices: store.mqtt.currentApps.apps,
        name: store.mqtt.currentApps.id
      }
    return React.createElement(anElement, props, null)
  }
}

DevicesApps = mapStoreToProps(DevicesApps)

export {DevicesApps}
const styles= {
  outer: {
    background:'#9338f4',
    height: 400,
    textAlign: 'center'    
  },
  inner: {
    margin: '0 auto',
    background: '#FFF28E',
    height: 340,
    color: 'red',
    textAlign: 'center',
    fontSize: '300%'
  }
}