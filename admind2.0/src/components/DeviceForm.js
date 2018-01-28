import React from 'react';
import {router} from '../app'

import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function DeviceForm(props){//one of the optioons in super component
  //console.log(props)
  const {device, devChanged, saveDev} = props

  const handleOnClick= (e)=>{
    e.preventDefault()
    console.log('been submitted')
    saveDev()
  }
  const handleOnChange= (e)=>{
    devChanged({key: e.target.name, val:e.target.value})
  }
  const verify=()=>{
    
    var raw = encodeURIComponent(JSON.stringify(device))
    //router.navigate('/verify?raw='+addr+'&appId=super&devId=CYURD14I')
    router.navigate('/verify?raw='+raw+'&appId=super&devId=CYURD14I')
  }

  return(
    <div>
      <div  >
        <span><strong>DeviceForm</strong></span><br/>
        {/*
        
        */}    
        <label htmlFor="devid">devid:</label>
        <input type="text" id="devid" name="devid" value={device.devid} onChange={handleOnChange} size="8"/><br/>
        <label htmlFor="devpwd">devpwd:</label>
        <input type="text" id="devpwd" name="devpwd" value={device.devpwd} onChange={handleOnChange} size="8"/><br/>
        <label htmlFor="bizid">bizid:</label>
        <input type="text" id="bizid" name="bizid" value={device.bizid} onChange={handleOnChange} size="8"/><br/>
        <label htmlFor="locid">locid:</label>
        <input type="text" id="locid" name="locid" value={device.locid} onChange={handleOnChange} size="16"/><br/>
        <label htmlFor="description">description:</label>
        <input type="text" id="description" name="description" value={device.description} onChange={handleOnChange} size="54"/><br/>
        <label htmlFor="address">address:</label>
        <input type="text" id="address" name="address" value={device.address} onChange={handleOnChange} size="54"/>
        <button onClick={verify}>verify</button>
        <br/>
        <label htmlFor="location">location:</label>
        <input type="text" id="location" name="location" value={device.location} onChange={handleOnChange} size="48"/><br/>
        <label htmlFor="timezone">timezone:</label>
        <input type="text" id="timezone" name="timezone" value={device.timezone} onChange={handleOnChange} size="40"/><br/>
        <label htmlFor="server">config:</label>
        <input type="text" id="server" name="server" value={device.server} onChange={handleOnChange} size="60"/><br/>
        <label htmlFor="specs">specs:</label>
        <input type="text" id="specs" name="specs" value={device.specs} onChange={handleOnChange} size="54"/><br/>
        <label htmlFor="owner">owner:</label>
        <input type="text" id="owner" name="owner" value={device.owner} onChange={handleOnChange} size="20"/><br/>
        <label htmlFor="apps">apps:</label>
        <input type="text" id="apps" name="apps" value={device.apps} onChange={handleOnChange} size="70"/><br/>
        <button onClick={handleOnClick}>save</button>
      </div>
    </div>
    )    
}
function mapStoreToProps(anElement){
  //returns a function called later with store as its arg and anElement from here
  return (store)=>{  
    const props= {
        devices: store.mqtt.devices,
        name: store.test.name
      }
    return React.createElement(anElement, props)
  }
}

//DeviceForm = mapStoreToProps(DeviceForm)
//console.log(DeviceForm())

export  { DeviceForm }

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