import React from 'react'
import {Nav} from '../components'// eslint-disable-line no-unused-vars
import {responsivePage} from '../showRWD'

class App extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount (){
  }
  loadNav(){
    if(this.props.cambio.shownav){
      return (
        <div className="header item-default">
          <Nav/>
        </div>
      )
    }
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
      <div className="container">
          {this.loadNav()}
        {this.showPage().map((el,i)=>{
          return <div className="content item-default" key={i}>{el}</div>
        })}
      </div>
      )
  }
}
export{App}
