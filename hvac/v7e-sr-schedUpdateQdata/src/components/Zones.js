import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {mapClass2Element} from '../hoc'
import {zonesHOC} from '../services/zonesHOC'
import {Zone} from './Zone' // eslint-disable-line no-unused-vars
import {maybeConnect, qdataAsArray} from '../services/interface'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

let Zones=(props)=>{
  console.log(props)
  // console.log('infocus: ', props.cambio.infocus)
  maybeConnect(props.cambio.infocus)
  const {devs, qdata, qdatab} = props;// eslint-disable-line no-unused-vars
  let dat = qdata
  if(!qdata){dat=qdatab}
  let qdataArr=qdataAsArray(dat)
  const displayZ=qdataArr.map((z)=>{
    return(
      <Zone key={z.id} zdsc={z} loc={props.cambio.page.params.loc}/>
    )
  })

  if(qdataArr.length>=1){
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
