import React from 'react'
import {router} from '../app'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Home(props){
	console.log(props);
  const { name } = props;
	const style = {
		...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
	function goAbout(){
		console.log("in home goAbout")
		router.navigate('about');
	}
  return(
    <div style={style.outer} ><h4>in big doHome {name} </h4>
			<button id="but" onClick={goAbout}>goto about</button>
		</div>
    )
}

export {Home}
