import React from 'react'
import {routing} from '../routing'
import {showRWD} from '../showRWD'
import {switchPage} from '../actions'

// console.log('in App');
// var router = routing()

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      appInfo: {appId: 'hvac', cbPath: 'http://10.0.1.233/spa/dist#/home', api: 'https://services.sitebuilt.net/sauth'},
      home: 'not home'
  	};
  }
  componentDidMount= ()=>{
    // console.log('App did mount');
    // console.log(router);
    // router.navigate('about')
    // console.log(router);
    //router.navigate('loclist')
    //var h = location.hash.slice(1);
    //switchPage({name: 'About', params: null});
  }

  showPage=()=>{
    // console.log(location.hash.slice(1));
    // console.log(this.state.responsive.page);
    // console.log(this.props.responsive.page);
    return showRWD(this.props)
  }
	render(){
		return(
			<div className="container">
        <div className="header item-default"><h4>App</h4></div>
        {/*        */}
        {this.showPage().map((el,i)=>{
          return <div className="content item-default" key={i}>{el}</div>
        })}
			</div>
			)
	}
}
export{App}
