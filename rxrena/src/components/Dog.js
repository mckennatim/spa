import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Dog(props){
  const { name } = props;
	console.log('dog');
  return(
    <div style={style.outer} ><h4>in doDog {name} </h4></div>
    )
}

export {Dog}
