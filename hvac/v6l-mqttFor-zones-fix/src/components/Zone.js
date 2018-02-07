import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Zone(props){
  const { name } = props;
  console.log(props)
  return(
    <div style={style.outer} ><h4>in big doZone {name} </h4></div>
    )
}

export {Zone}
