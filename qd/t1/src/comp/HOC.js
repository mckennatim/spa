import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

const WrpComp = (props)=>{
	console.log(props);
	const {name} =props
	return(
    <div style={style.outer} ><h4>in WprComp {name} </h4>
		</div>
    )
}


let Hoc=(WrpComp)=>{
  return (props)=>(
    <div style={style.outer} ><h4>in big doHOC </h4>
			<WrpComp {...props} />
		</div>
	);
};

let HOC = Hoc(WrpComp)

// let HOC=(WrpComp)=>{
// 	return class PP extends React.Component {
// 		render() {
// 			return (
// 				<WrpComp {...props} />
// 			)
// 		}
// 	}
// }

export {HOC}
