import React from 'react';
import {router} from '../app'
import {geta} from '../utilities'
var geocode = {}

var key ="AIzaSyDtrJ6jnivCGm3koarovP2EJSnYdK-RpRM"
var url="https://maps.googleapis.com/maps/api/timezone/json"
var timestamp=Math.floor(Date.now()/1000)

function VerifyList(props){
  console.log(props)
  const {dlst, appId, devId, dev} = props
  const handleChoice=(i)=>{
    console.log('handleing choice')
    console.log(i)
    geocode.address=props.dlst[i].formatted_address
    geocode.location=props.dlst[i].geometry.location

    var lat = props.dlst[i].geometry.location.lat;
    var lng = props.dlst[i].geometry.location.lng;
    var q = `${url}?location=${lat},${lng}&timestamp=${timestamp}&key=${key}`
    console.log(q)
    fetch(q)
      .then((response)=>response.json())
      .then((json)=>{
        console.log(json.timeZoneId)
        console.log(dev)
        var newDev = {
          ...dev,
          address: dlst[i].formatted_address,
          location: JSON.stringify(dlst[i].geometry.location),
          timezone: json.timeZoneId
        }
        console.log(newDev)
        var egs = encodeURIComponent(JSON.stringify(newDev))
        router.navigate(`/${appId}/${devId}?geo=${egs}`)
      })

  }

  const listItems= props.dlst.map((itt, i)=>{
    console.log(geta('itt.geometry.location',itt))
    return (<li key={i} onClick={handleChoice.bind(this,i)}>
      {itt.formatted_address}
      <span> {JSON.stringify(geta('itt.geometry.location',itt))}</span>
    </li>)
  },this)
  
  return(
    <div>
      <div style={styles.outer} >
        <h4>in VerifyList </h4>
        <ul>{listItems}</ul>
      </div>
    </div>
    )  
}
function mapStoreToProps(anElement){
  //returns a function called later with store as its arg and anElement from here
  return (store)=>{  
    const props= store
    return React.createElement(anElement, props)
  }
}

VerifyList = mapStoreToProps(VerifyList)

export {VerifyList}
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