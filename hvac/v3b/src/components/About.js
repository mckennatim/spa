import {pStyle} from '../styles'
import React, { Component } from 'react'
// const style = {
// 	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
// }
// pStyle.outer.background='#C4A265'
console.log('in About');

function About(props){
	const style = {
	...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
  const { name } = props;
  return(
    <div style={style.outer} >
			<h4>in About {name} </h4>
			<h5>what about</h5>

		</div>
    )
}

export {About}
