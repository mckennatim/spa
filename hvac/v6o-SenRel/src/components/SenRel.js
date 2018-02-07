import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function SenRel(props){
  const{zone, zdat} = props
  console.log(JSON.stringify(props))
  return(
    <div style={style.outer} >
    <span>{zone.name} </span>
    <span>temp: {zdat.temp} </span>
    <span>relay: {zdat.relay} </span>
    <span>setPt: {zdat.setPt} </span>
    </div>
    )
}

export {SenRel}
