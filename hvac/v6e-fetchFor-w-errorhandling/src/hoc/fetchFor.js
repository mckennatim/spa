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
			var lsh = ls.getItem();
			if(geta('lsh.token', lsh)){
				var url=cfg.url+lsh['email']
				cfg.options.headers.Authorization='Bearer ' + lsh['token']
		    fetch(url, cfg.options)
		      .then((response)=>response.json())
		      .then((json)=>{
						if(json.message){
							console.log(json.message);
							this.setState({...this.state,
								isLoading: true,
								data: [],
								message: 'Not authorized for this app'
							})
						}else{
							console.log(json);
							if(json.length==0){
								this.setState({...this.state,
									isLoading: true,
									data: json,
									message: 'You are not authorized for any locations on this app'
								})
							}else if(json.length==1){
								location.replace('#at/'+json[0])
								this.setState({...this.state,
									isLoading: true,
									data: json,
									message: 'Go right to location'
								})
							}else{
								this.setState({...this.state,
									isLoading: false,
									data: json,
									message: 'is loading'
								})
							}
						}
		      })
					.catch((err)=>{
						console.log('error');
						console.log(err);
						this.setState({...this.state,
							isLoading: true,
							data: [],
							message: 'Server failed to fetch data'
						})
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
