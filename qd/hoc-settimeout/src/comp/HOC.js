import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

const WrpComp = (props)=>{
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


let HocSetTimeout=(WrpComp)=>{
	return class PP extends React.Component {
		constructor (props){
			super(props);
			this.state= {isLoading: false, data: ['12parleyVale']}
		}
		componentDidMount(){
			 setTimeout(()=>{
				this.setState({...this.state, isLoading: true})
				console.log(this.state);
			}, 2000)
		}
		render() {
			return (
				<WrpComp {...this.props} {...this.state} />
			)
		}
	}
}

let HOC = HocSetTimeout(WrpComp)
export {HOC}
