import React from 'react'
import {router} from '../app'
import {Nav, Dog} from '../comp'

class App extends React.Component{
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {...props,
    	el3: {name: "mcmurry"},
    	we: {name: "curtis"},
    	otherwise: "dogshit"
  	};
  }
  componentDidMount= ()=>{
  }
  loadNav=()=>{
  	return Nav()
  }

	render(){
		return(
			<div className="container">
        <div className="header item-default">
  				{this.loadNav()}
        </div>
        <div className="content item-default">
          <Dog {...this.state}/>
        </div>
			</div>
			)
	}
}
export{App}
