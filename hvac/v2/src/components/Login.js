import React from 'react'
import {pStyle} from '../styles'
// const style = {
// 	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
// }
// pStyle.outer.background='#C4A265'

function Login(props){
	const style = {
	...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
  const { name } = props;
  return(
    <div style={style.outer} >
			<h4>in doLogin {name} </h4>
		</div>
    )
}

export {Login}
