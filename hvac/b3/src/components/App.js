import React from 'react'
// import {Home} from './Home'
import {showRWD} from '../showRWD'
// import {HomeOrLogin} from '../../../login/HomeOrLogin.js'
var router
const rts2 = [
  ['loclist', 'LocList'],
  ['home', 'Home'],
  ['login', 'Login'],
  [':loc', 'Loc']
]

class App extends React.Component{
  constructor(props) {
    super(props);
    // this.state = {
    //   ...props,
    //   appInfo: {appId: 'hvac', cbPath: 'http://10.0.1.233/spa/dist#/home', api: 'https://services.sitebuilt.net/sauth'},
    //   home: 'not home'
  	// };
  }
  componentDidMount= ()=>{
    console.log('component did mount');
    import('../sbrt').then(sbrt=>{
      router = sbrt.createRouter(rts2)
      router.refresh();
      console.log('then after import');
    })
  }

  showPage=()=>{
    console.log(this.props);
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
