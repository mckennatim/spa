import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function SenRel(props){
  const{azone, azdat} = props
  // console.log(JSON.stringify(azdat))
  return(
    <div style={style.outer} >
    <span>{azone.name} </span>
    <span>temp: {azdat[0].temp} </span>
    <span>relay: {azdat[0].relay} </span>
    <span>setPt: {azdat[0].setPt} </span>
    <span>timestamp: {JSON.stringify(azdat[0].ts)} </span>
    <span>sched: {JSON.stringify(azdat[0].sched)} </span>
    </div>
    )
}

export {SenRel}
