import React from 'react'// eslint-disable-line no-unused-vars
import {Nav} from '../components'
import {responsivePage} from '../showRWD'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      el3: {name: "mcmurry"},
      we: {name: "curtis"},
      otherwise: "dogshit"
    };
  }
  componentDidMount (){
  }
  loadNav(){
    return Nav()
  }

  showRt(rtpg){
    if(typeof rtpg != 'function'){
      return rtpg.pg(rtpg.params)
    }
      return rtpg(this.props)
  }
  showPage(){
    return responsivePage(this.props)
  }

  render(){
    return(
      <div>
        <div className="header">
        <h4>reroo tcards </h4>
          {this.loadNav()}
        </div>
        <div className="container">
        {this.showPage().map((el,i)=>{
          return <div className="content item-default" key={i}>{el}</div>
        })}
        </div>
      </div>
      )
  }
}
export{App}
