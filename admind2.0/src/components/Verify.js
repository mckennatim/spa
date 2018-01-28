import React from 'react';
import {VerifyList} from './VerifyList.js'
import {parseQuery} from '../utilities'

class Verify extends React.Component{
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {res: ["frog"], dog:'uly'}
  }

  componentDidMount(){
    const q = parseQuery(this.props.responsive.page.params.query)
    var dev = JSON.parse(decodeURIComponent(q.raw))
    var addr=dev.address.split(' ').join('+')
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}`
    console.log(url)
    fetch(url)
      .then((response)=>response.json())
      .then((json)=>{
        //console.log(json)
        this.setState({res: json.results, appId:q.appId, devId:q.devId, dev:dev})
        console.log(this.state)
        console.log(json.results)
      })    
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <div style={styles.outer} >
          <h4>in Verify </h4>
          <VerifyList dev={this.state.dev} dlst={this.state.res} appId={this.state.appId} devId={this.state.devId}/>
        </div>
      </div>
      )
    }    
}
function mapStoreToProps(anElement){
  //returns a function called later with store as its arg and anElement from here
  return (store)=>{  
    const props= store
    return React.createElement(anElement, props)
  }
}

Verify = mapStoreToProps(Verify)

export {Verify}
const styles= {
  outer: {
    background:'#9338f4',
    height: 400,
    textAlign: 'center'    
  },
  inner: {
    margin: '0 auto',
    background: '#FFF28E',
    height: 340,
    color: 'red',
    textAlign: 'center',
    fontSize: '300%'
  }
}