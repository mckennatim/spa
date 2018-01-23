import React from 'react'
import {cfg, ls} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

console.log(cfg);


function Loc(props){
  const { name } = props.test;
	const {params} =props.responsive.page
	ls.modItem("cloc", params.loc)
	const {status, data, message} = props
	const listItems= data.map((item, i)=>{
		let hash = '#at/'+item
		return(
			<li key={i}><a href={hash} data-navigo>{item}</a></li>
		)
	})
	const maybeLoad=()=>{
		switch(true){
			case status=='error':
				return (<p>{message}</p>)
			case status=='success'&& message=='no-records':
				return (<p>You are not registered at any Location</p>)
			case status=='success':
				console.log(data);
				ls.modItem("devs", data)
				return <ul>{listItems}</ul>
			default:
				return (<p>{message}</p>)
		}
	};
	const ml = maybeLoad()
  return(
    <div style={style.outer} ><h4>in dd doLoc {name} {params.loc}</h4>
			{ml}
		</div>
    )
}
const fconfig = {
	url: cfg.url.api+'/dedata/loc',
	urlparams: ['cloc'],
	options: {headers: {'Authorization': 'Bearer '}},
}

Loc = mapClass2Element(fetchFor(Loc, fconfig))
export {Loc}
