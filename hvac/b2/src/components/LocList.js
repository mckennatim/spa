import React from 'react'
import {pStyle} from '../styles'
// const style = {
// 	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
// }
// pStyle.outer.background='#C4A265'

function LocList(props){
	const style = {
	...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
  const { name } = props;
  return(
    <div style={style.outer} >
			<h4>in doLocList {name} </h4>
		</div>
    )
}

export {LocList}
