import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Home(props){
  const { name } = props;
	console.log('frog');
  return(
    <div className="content item-default" style={style.outer} ><h4>in doHome {name} </h4></div>
    )
}

export {Home}
