import React from 'react'
import {router} from '../app'
import * as compoi from '../comp'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    	el3: {name: "mcmurry"},
    	we: {name: "curtis"},
    	otherwise: "dogshit"
  	};
  }
  componentDidMount= ()=>{
  }
  loadNav=()=>{
  	return compoi['Nav']()
  }
  loadPage=()=>{
    return compoi[this.props.page.name](this.props)
  }

	render(){
		return(
			<div className="container">
        <div className="header item-default">
  				{this.loadNav()}
        </div>
        <div className="content item-default">
          {this.loadPage()}
        </div>
			</div>
			)
	}
}
export{App}
