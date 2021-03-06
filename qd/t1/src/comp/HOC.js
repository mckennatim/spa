import React from 'react'
import {HocSetTimeout} from '../hoc/HocSetTimeout'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

let HOC = (props)=>{
	console.log(props);
	const {name, isLoading, data} =props
	const listItems= data.map((item, i)=>{
		return(
			<li key={i}>{item}</li>
		)
	})
	const maybeLoad=()=>{
		if(isLoading){
			return (<p>is loading</p>)
		}else{
			return(<div>
				<ul>{listItems}</ul>
			</div>)
		}
	};
	const ml = maybeLoad()
	return(
    <div style={style.outer} ><h4>in WprComp {name} </h4>
			{ml}
		</div>
    )
}
function mapClass2Element(aClassElement){
  //returns a function called later with store as its arg and aClassElement from here
  return (state)=>{
    const props= state
    return React.createElement(aClassElement, props)
  }
}

HOC = mapClass2Element(HocSetTimeout(HOC))
export {HOC}
