import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Home(props){
	console.log(props);
  const { name } = props;
  return(
    <div style={style.outer} ><h4>in big doHome {name} </h4>
		</div>
    )
}

export {Home}
