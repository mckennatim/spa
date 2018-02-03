import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {mqttFor, mapClass2Element} from '../hoc'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

let Zones=(props)=>{
  const {devs, zones } = props;// eslint-disable-line no-unused-vars
  console.log(props)
  // console.log(JSON.stringify(zones, null, '\t'))
  // console.log(JSON.stringify(devs, null, '\t'))
  if(zones){
    return(
      <div style={style.outer}>
        <ul>{zones.map((z,i)=>{
          return(
            <li key={i}><div>
              {z.name} 
              {z.img} <br/>
              temp: {z.temp} <br/>
              relay: {z.relay} <br/>
              setPt: {z.setPt} 

            </div></li>
            )

        })}</ul>
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
