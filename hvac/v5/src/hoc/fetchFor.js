import React from 'react'
import {geta} from '../utilities'
import {ls} from '../utilities/getCfg'

let fetchFor=(Comp, cfg)=>{
	return class PP extends React.Component {
		constructor (props){
			super(props);
			this.state= {isLoading: true, data: []}
		}
		componentDidMount(){
			console.log(cfg);
			var lsh = ls.getItem();
			if(geta('lsh.token', lsh)){
				console.log(lsh.token);
				var url=cfg.url
				console.log(url);
		    fetch(url, cfg.options)
		      .then((response)=>response.json())
		      .then((json)=>{
		        console.log(json)
						 this.setState({...this.state, isLoading: false, data: json})
		      })
			}else{
				console.log('null is false');
			}
		}
		render() {
			return (
				<Comp {...this.props} {...this.state} />
			)
		}
	}
}

export{fetchFor}
