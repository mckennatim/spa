import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {Day} from './Day'// eslint-disable-line no-unused-vars
import {fetchTcard, putTcardWk} from '../services/fetches'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {pStyle} from '../styles'


class TimeCard extends React.Component{
  active='mabibi'
  state = {week:moment().week(), wkarr:[], hrs:[], jchrs:[], wstat:undefined, showsub:false}
  yr= moment().format('YYYY')
  componentDidMount(){
    this.getTimeCard(this.state.week)
  }  
  getTimeCard(wk){
    fetchTcard(wk)
      .then((res)=>{
        this.emailId=res.emailid
        if (res.message){
          window.alert(res.message)
        }else{
          this.setState({week:wk, wkarr:res.wkarr, hrs:res.hrs, jchrs:res.jchrs, jobs:res.jobs, wstat:res.wstat})
        }
      })
  }

  chwk=(e)=>{
    let val =e.target.value
    console.log('val: ', val)
    if(val>0 && val<=52){
      this.getTimeCard(e.target.value)
    }
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
      this.setState({wkarr, hrs:hrarr}, this.checkStatus())
    }
    if (cmd=='delpu'){
      let wkarr = this.state.wkarr.slice()
      const idx = wkarr.findIndex((d)=>d.wdprt==newdata)
      const da = wkarr[idx]
      const nda ={...da}
      nda.hrs=0
      nda.inout =[]
      wkarr[idx]=nda
      let hrarr = this.state.hrs
      hrarr[idx]=0
      this.setState({wkarr, hrs:hrarr}, this.checkStatus())
    }
    if(cmd=='jcost'){
      const idx = newdata.idx
      const njcost = newdata.jcost.slice()
      const sumhrs = drnd(njcost.reduce((t,j)=>j.hrs+t, 0))
      console.log('sumhrs: ', sumhrs)
      let jchrarr = this.state.jchrs
      jchrarr[idx]=sumhrs
      let wkarr = this.state.wkarr.slice()
      wkarr[idx].jcost=njcost
      wkarr[idx].jchrs=sumhrs
      this.setState({wkarr, jchrs:jchrarr}, this.checkStatus())
    }
  }

  checkStatus =()=>{
    console.log('this.state.hrs: ', this.state.hrs)
    console.log('this.state.jchrs: ', this.state.jchrs)
    const {hrs, jchrs}=this.state
    const thrs= hrs.reduce((t,h)=>t+h,0)
    const st = hrs
      .map((h,i)=>h==jchrs[i])
      .reduce((t,j)=>t+j,0)
    console.log('st: ', st)
    let newstat
    let showsub
    if(st<7 || thrs==0){
      newstat = 'inprocess'
      showsub=false
    }else{
      newstat = 'ready'
      showsub=true
    }
    this.changeStatus(newstat,showsub)
  }
  clSubmit=()=>{
    this.changeStatus('submitted', false)
  }

  changeStatus=(status, showsub)=>{
    let nwstat = {...this.state.wstat}
    nwstat.status = status
    nwstat.hrs=drnd(this.state.hrs.reduce((t,h)=>t+h,0))   
    nwstat.wprt=`${this.yr}-W${this.state.week.toString().padStart(2,'0')}`
    putTcardWk(nwstat)
    this.setState({wstat:nwstat, showsub:showsub},()=>console.log('this.state.wstat: ', this.state.wstat))
  }
  setStatStyle=()=>{
    let sta= {
      float: 'left',
      background: '#efe869',
      width: '70px'
    }
    if(this.state.showsub || 
      (this.state.wstat &&(this.state.wstat.status=='submitted' 
      || this.state.wstat.status=='approved' 
      || this.state.wstat.status=='paid'
      ))){
      sta.background ='#9eea9d'
    }
    return sta
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

      const {week, wstat, showsub}=this.state;
      const status= wstat ? wstat.status : "unsaved" 
      const statstyle = this.setStatStyle()
      // unsaved, inprocess, ready, submitted, approved, paid
      const thrs=drnd(this.state.hrs.reduce((t,h)=>t+h,0))
      const renderedDays = this.renderDays()
      return(
        
          <div style={style.outer}>
          <div style={style.inner}>
          <div style={statstyle}> {status} </div>
          <span style={style.but}>
            {showsub && <button onClick={this.clSubmit}>submit</button> }
          </span>
          <span style={style.inp}>
          <span>week 
            <input type="number" value={week} onChange={this.chwk} style={{width:"35px"}}/>
          </span>
          </span>
          <div style={style.thrs}>
            {drnd(thrs)}
          </div>
          {renderedDays}
          </div>
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

const drnd=(n)=>{
  return Math.round(n*100)/100
}

// const style = {
//   outer:{
//     background: 'silver'
//   }
// }

const style = {
  inn:{
    height:'80px',
    background: 'aqua'
  },
  but:{
    width: '70px'
  },
  inp:{
    float:'right'
  },
  thrs:{
    fontSize: '20px',
    float:'right'
  },
  ...pStyle, outer: {...pStyle.outer, background: 'silver'}
}
//pStyle.outer.background='#C4A265'