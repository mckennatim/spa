import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function LocList(props){
	// console.log(props);
  const { name } = props.test;
  return(
    <div style={style.outer} ><h4>in doLocList {name} </h4></div>
    )
}

export {LocList}
