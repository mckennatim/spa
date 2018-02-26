import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
//import {mapClass2Element} from '../hoc'
import {ZonesMqtt} from './ZonesMqtt'// eslint-disable-line no-unused-vars
import {Zone} from './Zone' // eslint-disable-line no-unused-vars
import {maybeConnect} from '../services/interface'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

let Zones=(props)=>{
  console.log(props)
  // console.log('infocus: ', props.cambio.infocus)
  maybeConnect(props.cambio.infocus)
  
  // const displayZ = ((zones)=>zones.map((z)=>{
  //   return(
  //     <Zone key={z.id} zdsc={z} loc={props.cambio.page.params.loc}/>
  //   )
  // }))


  return(
    <div style={style.outer}>
      <ZonesMqtt render={({zones})=>{
        console.log(zones)
      return(
        <div>
          <h4>Zones list {props.shoulda} {props.cambio.infocus}</h4>
          <ul>
          </ul>
        </div>
      )}}/>
    </div>
    )

}

export {Zones}
