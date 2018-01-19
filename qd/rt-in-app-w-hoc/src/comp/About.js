import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function About(props){
	console.log(props);
  const { name } = props;
	const style = {
		...pStyle, outer: {...pStyle.outer, background: '#FF9966'}
	}
  return(
    <div style={style.outer} ><h4>in big doAbout {name} </h4>
		</div>
    )
}

export {About}
