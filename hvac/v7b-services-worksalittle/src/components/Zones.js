import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
// import {mqttFor, mapClass2Element} from '../hoc'
import {Zone} from './Zone' // eslint-disable-line no-unused-vars
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

let Zones=(props)=>{
  
  const {devs, zones} = props;// eslint-disable-line no-unused-vars

  const displayZ=zones.map((z)=>{
    return(
      <Zone key={z.id} zdsc={z} loc={props.page.params.loc}/>
    )
  })

  if(zones.length>=1){
    return(
      <div style={style.outer}>
      <h4>Zones list</h4>
        <ul>
        {displayZ}
        </ul>
      </div>
      )
  }else {
    return(
      <div style={style.outer}>
        <p>no zones</p>
      </div>
      )
  }
}

// const fconfig = {}

//Zones = mapClass2Element(mqttFor(Zones, fconfig))
export {Zones}
