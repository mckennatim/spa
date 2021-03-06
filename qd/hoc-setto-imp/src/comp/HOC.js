import React from 'react'
import {HocSetTimeout} from '../hoc/HocSetTimeout'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

let HOC = (props)=>{
	console.log(props);
	const {name, isLoading} =props
	const maybeLoad=()=>{
		if(isLoading){
			return (<p>is loading</p>)
		}else{
			return (<p>a list</p>)
		}
	};
	const ml = maybeLoad()
	return(
    <div style={style.outer} ><h4>in WprComp {name} </h4>
			{ml}
		</div>
    )
}


HOC = HocSetTimeout(HOC)
export {HOC}
