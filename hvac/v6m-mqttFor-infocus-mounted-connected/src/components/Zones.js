import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {mqttFor, mapClass2Element} from '../hoc'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

let Zones=(props)=>{
  const {devs, zones, zdat} = props;// eslint-disable-line no-unused-vars

  const displayZ=zones.map((z,i)=>{
    return(
      <li key={z.id}><div>
        {z.name} 
        {z.img} <br/>
        temp: {zdat[i].temp}
       
      </div></li>
    )
  })

  if(zones.length>0){
    return(
      <div style={style.outer}>
        <ul>
        {displayZ}
        </ul>
      </div>
      )
  }else{
    return(
      <div style={style.outer}>
        <p>no zones</p>
      </div>
      )
  }
}

const fconfig = {}

Zones = mapClass2Element(mqttFor(Zones, fconfig))
export {Zones}
