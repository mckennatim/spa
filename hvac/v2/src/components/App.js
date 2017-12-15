import React from 'react'
import {Home} from './Home'
import {showRWD} from '../showRWD'
// import {HomeOrLogin} from '../../../login/HomeOrLogin.js'


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      appInfo: {appId: 'hvac', cbPath: 'http://10.0.1.233/spa/dist#/home', api: 'https://services.sitebuilt.net/sauth'},
      home: 'not home'
  	};
  }
  componentDidMount= ()=>{}

  showPage=()=>{
    return showRWD(this.props)
  }
	render(){
		return(
			<div className="container">
        <div className="header item-default"><h4>App</h4></div>
        {/*
          <div className="header item-default"><h4>App</h4></div>
          <Home name={this.state.name}></Home>
          <HomeOrLogin appInfo={this.state.appInfo} home={this.state.home}></HomeOrLogin>

          {dobr}
        */}
        {this.showPage().map((el,i)=>{
          return <div className="content item-default" key={i}>{el}</div>
        })}
			</div>
			)
	}
}
export{App}
