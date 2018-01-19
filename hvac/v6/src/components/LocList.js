import React from 'react'
import {cfg, ls} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'
import {mStyle} from '../styles'


var tops = {dog: 'Ulysses'}

let LocList = (props)=>{
	console.log(props);
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
			case status=='success'&& message=='just-1':
				location.replace('#at/'+data[0])
			case status=='success'&& message=='multi':
				return <ul>{listItems}</ul>
			default:
				return (<p>{message}</p>)
		}
	};
	const ml = maybeLoad()
	return(
		<div >
			<h3> Location List </h3>
			{ml}
		</div>
	)
}

const fconfig = {
	url: cfg.url.api+'/dedata/loclist',
	options: {headers: {'Authorization': 'Bearer '}},
}

LocList = mapClass2Element(fetchFor(LocList, fconfig))
export {LocList}
