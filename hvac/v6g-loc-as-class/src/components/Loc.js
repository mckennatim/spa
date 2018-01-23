import React from 'react'
import {cfg, ls} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

console.log(cfg);


class Loc extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    	el3: {name: "mcmurry"},
    	we: {name: "curtis"},
    	otherwise: "dogshit"
  	};
  }

	render(){
		const { name } = this.props.test;
		const {params} =this.props.responsive.page
		const {status, data, message} = this.props
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
		ls.modItem("cloc", params.loc)
	  return(
	    <div style={style.outer} ><h4>in dd doLoc {name} {params.loc}</h4>
				{ml}
			</div>
	    )
	}
}
const fconfig = {
	url: cfg.url.api+'/dedata/loc',
	urlparams: ['cloc'],
	options: {headers: {'Authorization': 'Bearer '}},
}

Loc = mapClass2Element(fetchFor(Loc, fconfig))
export {Loc}
