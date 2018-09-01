import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: 'skyblue'}
}
const HomeOrLogin=(props)=>{
  const { appInfo, home }= props;
  console.log('frog');
  console.log('appInfo', appInfo);
  console.log(home);
  return(
    <div className="content item-default" style={style.outer}><h4>fduck</h4></div>
  )
}

export{HomeOrLogin}
