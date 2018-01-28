import React from 'react'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import {DeviceForm} from './DeviceForm.js'
import {getCfg, ls} from '../utilities/getCfg'
var cfg = getCfg()
var baseURL=cfg.url.api



import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

let device  =      {
      devid: 'CYURD007',
      devpwd: 'geniot',
      description: '2 temps, 3 timers 1 relay demo board',
      bizid: 'sbs',
      locid: '12ParleyVale',
      address: '12 Parley Vale, Jamaica Plain, MA 02130',
      location: '{"lat":42.315,"lng":-71.111}',
      timezone: 'America/New_York',
      server:'{"mqtt_server":"sitebuilt.net","mqtt_port":"1884","sensor_type":""}', 
      specs: '{"HAStIMER":28,"notTimerTags":["temp","onoff","hilimit","lolimit"]}',
      owner: 'tim@sitebuilt.net',
      apps: '["admin", "user"]'
    }

class Super extends React.Component{
  constructor(props) {
    super(props);
    //console.log(props)
    //console.log(props.responsive.page.params)
    var equery = props.responsive.page.params.query
    if(equery!=""){
      var newDev = JSON.parse(decodeURIComponent(equery.split("=")[1]))
      console.log(newDev)
      this.state = {adev:newDev}
    }else{
      this.state = {adev:device}
    }
    this.state = {...this.state, mode:'new'}
  }  
  setupNewDevice=()=>{
    console.log('setting up new device')
    this.setState({...this.state, mode:'new'})
  }
  searchDevices=()=>{
    console.log('search devices')
    var url=baseURL+'/dedata/dev'
    fetch(url,{
      headers: {
        'Authorization': 'Bearer ' + ls.getCurrentToken().token
      }
    })
      .then((response)=>response.json())
      .then((json)=>{
        this.setState({...this.state, mode:'search', devices:json})
        console.log(json)
      })
  }
  editDevice=(i)=>{
    console.log('editing device ',i)
    console.log(this.state)
    this.setState({...this.state, adev:this.state.devices[i], mode:'new' })
  }

  onDevChange = (item)=>{
    console.log(item)
    var f=this.state.adev
    f[item.key]=item.val
    console.log(f)

    this.setState(f)
    console.log(this.state)
  }
  onSaveDev=()=>{
    console.log('in super onSaveDev')
    var url=baseURL+'/dedata/dev'
    Observable.ajax({
      url: url,
      method: 'POST',
      body: this.state.adev,
      responseType: 'json',
      headers: {
        'Authorization': 'Bearer ' + ls.getCurrentToken().token
      }
    }).subscribe((xhr)=>{
      console.log(xhr.response)
    })    
  }

  displayWhich=(mode)=>{
    console.log('IN dispalwhich ',mode)
    switch(true){
      case mode=='new':
        return(
          <DeviceForm device={this.state.adev}
                      devChanged={this.onDevChange}
                      saveDev={this.onSaveDev}
          />          
        )
        break
      case mode=='search':
        const mydevs = this.state.devices
        console.log(mydevs[0])
        const dog = mydevs.map((dev,i)=>{
          return (<li key={i} onClick={this.editDevice.bind(this,i)}>
              <span> {dev.devid}</span>
              <span> {dev.address}</span>
              <span> {dev.location}</span>
              <span> {dev.timezone}</span><br/>
              <span> {dev.server}</span>
              <span> {dev.apps}</span>
              <span> {dev.owner}</span>
            </li>)
        },this)
        console.log(dog[0])      
        return(
          <div>
          <h5>searching</h5>
          <ul>{dog}</ul>
          </div>
        )
        break  
      default:
        return(<h5>hey dog</h5>)  
    } 
  }


  render(){
  return(
    <div style={style.outer} >
      <div>
      	<span><strong>in doSuper {name} </strong></span><br/>
        <button onClick={this.setupNewDevice}>setup new device</button>
        <button onClick={this.searchDevices}>search devices</button>
      </div>
      {this.displayWhich(this.state.mode)}
    </div>
    )
  }
}
function mapStoreToProps(anElement){
  //returns a function called later with store as its arg and anElement from here
  return (store)=>{  
    //console.log(store)
    const props= store
    return React.createElement(anElement, props, null)
  }
}

Super = mapStoreToProps(Super)

export {Super}