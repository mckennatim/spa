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
  state = {week:moment().week(), wkarr:[], hrs:[], jchrs:[], wstat:undefined}
  yr= moment().format('YYYY')
  componentDidMount(){
    this.getTimeCard(this.state.week)
  }  
  getTimeCard(wk){
    fetchTcard(wk)
      .then((res)=>{
        this.emailId=res.emailid
        console.log('res: ', res)
        if (res.message){
          window.alert(res.message)
        }else{
          this.setState({week:wk, wkarr:res.wkarr, hrs:res.hrs, jchrs:res.jchrs, jobs:res.jobs, wstat:res.wstat})
        }
      })
  }

  chwk=(e)=>{
    this.getTimeCard(e.target.value)
  }

  handleDayChanges = (cmd, newdata)=>{
    if (cmd=='punch'){
      const inout = newdata.inout.slice()
      const ndata= {...newdata}
      ndata.inout=inout
      const idx = ndata.idx
      const hrs = ndata.hrs
      let hrarr = this.state.hrs
      hrarr[idx]=hrs
      let wkarr = this.state.wkarr.slice()
      wkarr[idx]=ndata
      this.setState({wkarr, hrs:hrarr})
      console.log('this.state: ', this.state)
    }
    if (cmd=='delpu'){
      console.log('newdata: ', newdata)
      let wkarr = this.state.wkarr.slice()
      const idx = wkarr.findIndex((d)=>d.wdprt==newdata)
      const da = wkarr[idx]
      const nda ={...da}
      nda.hrs=0
      nda.inout =[]
      wkarr[idx]=nda
      let hrarr = this.state.hrs
      console.log('hrarr: ', hrarr)
      hrarr[idx]=0
      console.log('hrarr: ', hrarr)
      console.log('wkarr: ', wkarr)
      this.setState({wkarr, hrs:hrarr})
    }
    if(cmd=='jcost'){
      const idx = newdata.idx
      const njcost = newdata.jcost.slice()
      const sumhrs = njcost.reduce((t,j)=>j.hrs+t, 0)
      console.log('idx: ', idx)
      console.log('njcost: ', njcost)
      let wkarr = this.state.wkarr.slice()
      wkarr[idx].jcost=njcost
      wkarr[idx].jchrs=sumhrs
      console.log('wkarr: ', wkarr)
      this.setState({wkarr})
    }
  }

  renderDays=()=>{
    const {week, wkarr, jobs}=this.state;
    const rd = wkarr.map((d)=>{
      return(
        <Day key={d.idx} data={d} week={week} jobs={jobs} dayChanges={this.handleDayChanges}/>
      )
    })
    return rd
  }

  render(){
    if(this.emailId){    
      const {week,wstat}=this.state;
      const status=wstat ? wstat.status : "unsaved" 
      // unsaved, inprocess, ready, submitted, approved, paid
      const thrs=this.state.hrs.reduce((t,h)=>t+h,0)
      const renderedDays = this.renderDays()
      return(
        <div style={style.outer}>
          <h4> {status} TimeCard for {this.emailId} {week}</h4>
          <span>week <input type="number" value={week} onChange={this.chwk} style={{width:"35px"}}/>{thrs}</span>
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
