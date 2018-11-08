import React from 'react'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'

class Report extends React.Component{
  active='mabibi'
  componentDidMount(){
    this.getReport()
  }  
  getReport(){
    console.log('dog')
  }
  render(){
    return(
      <div style={style.he}>
        <h3> Report is {this.active}</h3>
      </div>
    )
  }
}
Report = mapClass2Element(Report)

export {Report}

const style = {
  he:{
    overflow:'hidden',
    margin: '2px 10px 10px 10px',
    padding: '4px',
    background: '#C4A265'
  }
}