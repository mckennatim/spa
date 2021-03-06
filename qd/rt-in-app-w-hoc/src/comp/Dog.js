import React from 'react'
import {HOC} from './HOC'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Dog(props){
  const { name } = props;
	const style = {
		...pStyle, outer: {...pStyle.outer, background: '#CC99CC'}
	}
  return(
    <div style={style.outer} ><h4>in big doDog {name} </h4>
			<HOC {...props}/>
		</div>
    )
}

export {Dog}
