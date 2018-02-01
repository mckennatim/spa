import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#ffe500'}
}
pStyle.outer.background='#C4A265'

function Zones(props){
  const {devs, zones } = props;
  console.log(props)
  if(zones){
    return(
      
        <p>hay zones</p>
      )
  }else{
    return(
      <p>no zones</p>
      )
  }

}

export {Zones}
