import React from 'react';
import {router} from '../app'

import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function UserForm(props){//one of the optioons in super component
  //console.log(props)
  const {user, userChanged, saveUser} = props

  const handleOnClick= (e)=>{
    e.preventDefault()
    console.log('been submitted')
    saveUser()
  }
  const handleOnChange= (e)=>{
    userChanged({key: e.target.name, val:e.target.value})
  }

  return(
    <div>
      <div  >
        <span><strong>UserForm</strong></span><br/>
        {/*
        
        */}    
        <label htmlFor="bizid">bizid:</label>
        <input type="text" id="bizid" name="bizid" value={user.bizid} onChange={handleOnChange} size="8"/><br/>
        <label htmlFor="userid">userid:</label>
        <input type="text" id="userid" name="userid" value={user.userid} onChange={handleOnChange} size="30"/><br/>
        <label htmlFor="appid">appid:</label>
        <input type="text" id="appid" name="appid" value={user.appid} onChange={handleOnChange} size="8"/><br/>
        <label htmlFor="role">role:</label>
        <input type="text" id="role" name="role" value={user.role} onChange={handleOnChange} size="48"/><br/>
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

//UserForm = mapStoreToProps(UserForm)
//console.log(UserForm())

export  { UserForm }

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