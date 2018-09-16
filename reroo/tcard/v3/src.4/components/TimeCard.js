import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {Day} from './Day'// eslint-disable-line no-unused-vars
import {fetchTcard} from '../services/fetches'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class TimeCard extends React.Component{
  active='mabibi'
  state = {week:moment().week(), wkarr:[], hrs:[], jchrs:[]}
  yr= moment().format('YYYY')
  componentDidMount(){
    this.getTimeCard(this.state.week)
  }  
  getTimeCard(wk){
    fetchTcard(wk)
      .then((res)=>{
        console.log('Timecard res: ', res)
        this.emailId=res.emailid
        this.setState({week:wk, wkarr:res.wkarr, hrs:res.hrs, jchrs:res.jchrs})
      })
  }

  chwk=(e)=>{
    this.getTimeCard(e.target.value)
  }

  handleDayChanges = (newdata)=>{
    const ndata= {...newdata}
    const idx = ndata.idx
    let wkarr = this.state.wkarr
    wkarr[idx]=newdata
    this.setState({wkarr:wkarr})
  }

  renderDays=()=>{
    const {week, wkarr}=this.state;
    const rd = wkarr.map((d)=>{
      return(
      <div key={d.idx}>          
        <Day data={d} week={week} dayChanges={this.handleDayChanges}/>
      </div> )   
    })
    return rd
  }

  render(){
    const {week}=this.state;
    if(this.emailId){
      const renderedDays = this.renderDays()
      return(
        <div style={style.outer}>
          <h4> TimeCard for {this.emailId} {week}</h4>
          <span>week <input type="number" value={week} onChange={this.chwk} style={{width:"35px"}}/></span>
          {renderedDays}
        </div>
      )
    }else{
    return(
        <div>yeah you dont seem to be logged in here, try register</div>
      )
    }
  }
}

TimeCard = mapClass2Element(TimeCard)

export {TimeCard}
