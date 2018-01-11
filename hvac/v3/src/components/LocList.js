import React from 'react'
import {pStyle} from '../styles'
import {router} from '../app'

// const style = {
// 	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
// }
// pStyle.outer.background='#C4A265'
// console.log('in Loclist');

function LocList(props){
	function go(){
		router.navigate('login')
	}

	const style = {
	...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
  const { name } = props;
  return(
    <div style={style.outer} >
			<h4>in doLocList {name} </h4>
			<button onClick={go}>goto login</button>
		</div>
    )
}

export {LocList}
