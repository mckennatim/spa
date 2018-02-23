import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {mapClass2Element} from '../hoc'
import {zonesHOC} from '../services/zonesHOC'
import {Zone} from './Zone' // eslint-disable-line no-unused-vars
import {maybeConnect} from '../services/interface'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

let Zones=(props)=>{
  console.log(props.payload)
  // console.log('infocus: ', props.cambio.infocus)
  maybeConnect(props.cambio.infocus)
  const {devs, zones} = props;// eslint-disable-line no-unused-vars
  const displayZ=zones.map((z)=>{
    return(
      <Zone key={z.id} zdsc={z} loc={props.cambio.page.params.loc}/>
    )
  })

  if(zones.length>=1){
    return(
      <div style={style.outer}>
      <h4>Zones list {props.shoulda} {props.cambio.infocus}</h4>
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

const fconfig = {}

Zones = mapClass2Element(zonesHOC(Zones, fconfig))
export {Zones}
