import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Loc(props){
	// console.log(props);
  const { name } = props.test;
	const {params} =props.responsive.page
	console.log(params);
  return(
    <div style={style.outer} ><h4>in dd doLoc {name} {params.loc}</h4></div>
    )
}

export {Loc}
