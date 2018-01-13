import React from 'react'
import {Home} from './Home'
// import {HomeOrLogin} from '../../../login/HomeOrLogin.js'
import {HomeOrLogin} from './HomeOrLogin.js'
console.log(HomeOrLogin);


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      appInfo: {appId: 'hvac', cbPath: 'http://10.0.1.233/spa/dist#/home', api: 'https://services.sitebuilt.net/sauth'},
      home: Home
  	};
  }
  componentDidMount= ()=>{

  }
  areLoggedIn=()=>{
    return Math.floor(Math.random()*2)
  }

  home =  ()=><Home name={this.state.name}></Home>
  homeOrLogin = ()=><HomeOrLogin appInfo={this.state.appInfo} home={this.state.home}></HomeOrLogin>


  branch=(iftrue, p1, p2)=>{
    var p
    iftrue ? p=p1 : p=p2
    return p
  }
	render(){
    console.log(this.home);
    const dobr = this.branch(this.areLoggedIn(), this.home(), this.homeOrLogin())
    console.log(dobr);
		return(
			<div className="container">
        <div className="header item-default"><h4>App</h4></div>
        {/*
          <Home name={this.state.name}></Home>
          <HomeOrLogin appInfo={this.state.appInfo} home={this.state.home}></HomeOrLogin>

          */}
        {dobr}
			</div>
			)
	}
}
export{App}
