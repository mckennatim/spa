import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function Loc(props){
  const { name } = props.test;
	const {params} =props.responsive.page
	//save current loc to ls and maybe to store
	//get devices for theis app and loc and user using fetchFor
  return(
    <div style={style.outer} ><h4>in dd doLoc {name} {params.loc}</h4></div>
    )
}

export {Loc}
// token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imh2YWMiLCJlbWFpbCI6Im1ja2VubmEudGltQGdtYWlsLmNvbSJ9.sGOLsRpWPi9EgJmGqtrAmb3p1Bosnf_iKS7hPky_fCk"
//
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imh2YWMiLCJlbWFpbCI6Im1ja2VubmEudGltQGdtYWlsLmNvbSJ9.sGOLsRpWPi9EgJmGqtrAmb3p1Bosnf_iKS7hPky_fCk
//
// {"email":"tim@sitebuilt.net","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imh2YWMiLCJlbWFpbCI6InRpbUBzaXRlYnVpbHQubmV0In0.e8oviN49uxjbc9FgcyPWV-vQYp0YlD183FhqCWzpuT0"}
