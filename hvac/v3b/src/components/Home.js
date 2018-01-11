import {pStyle} from '../styles'
import React, { Component } from 'react'
// const style = {
// 	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
// }
// pStyle.outer.background='#C4A265'

function Home(props){
	const {locid} = props.responsive.page.params
	// const {locid} = 'llama'
	const style = {
	...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
  const { name } = props;
  return(
    <div style={style.outer} >
			<h4>in doHome {name} </h4>
			<h5>{locid}</h5>
			
		</div>
    )
}

export {Home}
