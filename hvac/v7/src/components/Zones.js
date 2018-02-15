import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {mqttFor, mapClass2Element} from '../hoc'
import {Zone} from './Zone' // eslint-disable-line no-unused-vars
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

let Zones=(props)=>{
  
  const {devs, zones, zdat} = props;// eslint-disable-line no-unused-vars

  const handleRefresh = ()=>{// eslint-disable-line no-unused-vars
    props.initYconn()
  }

  const displayZ=zones.map((z,i)=>{
    return(
      <Zone key={z.id} zdati={zdat[i]} zdsc={z} loc={props.page.params.loc}/>
    )
  })

  if(zones.length>=1 && zdat.length>1){
    return(
      <div style={style.outer}>
        <ul>
        {displayZ}
        </ul>
        <button onClick={handleRefresh}> refresh </button>
      </div>
      )
  }else if (zones.length>1 && zdat.length==1){
    return(
      <div style={style.outer}>
        <p>neds a refresh</p>
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

const fconfig = {}

Zones = mapClass2Element(mqttFor(Zones, fconfig))
export {Zones}
