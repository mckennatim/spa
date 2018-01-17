import React from 'react'
import {router} from '../app'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

const Home = (props) =>{

	function goAbout(){
		console.log("in home goAbout")
		router.navigate('about');
	}
		const style = {
		...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
	const direct2 =()=>{
		console.log(router);
		return <p>ha</p>
	}

	return(
		<div style={style.outer}>
			<h3> Home </h3>
			<button id="but" onClick={goAbout}>goto about</button>

		</div>
	)
}

export {Home}
