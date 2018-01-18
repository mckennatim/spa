import React from 'react'

let HocSetTimeout=(Comp)=>{
	return class PP extends React.Component {
		constructor (props){
			super(props);
			this.state= {isLoading: true, data: ['12parleyVale', '255Chestnut']}
		}
		componentDidMount(){
			 setTimeout(()=>{
				this.setState({...this.state, isLoading: false})
				console.log(this.state);
			}, 2000)
		}
		render() {
			return (
				<Comp {...this.props} {...this.state} />
			)
		}
	}
}

export{HocSetTimeout}
