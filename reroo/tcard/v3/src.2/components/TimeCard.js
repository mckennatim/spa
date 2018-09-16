import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {Day} from './Day'// eslint-disable-line no-unused-vars
import {ls} from '../utilities/getCfg'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class TimeCard extends React.Component{
  active='mabibi'
  state = {week:moment().week(), emailId:ls.getKey('email'), wkhrs:0, tdata:{days:[]}}
  yr= moment().format('YYYY')
  componentDidMount(){
    this.getTimeCard()
  }  
  getTimeCard(){
    console.log('doggy');
  }
  chwk=(e)=>{
    this.setState({week:e.target.value})
  }
  updat=()=>{
    const wdprt = `${this.yr}-W${this.state.week.toString().padStart(2,'0')}-1`
    let da=[]
    da.push(moment(wdprt).subtract(3, 'days').format("YYYY-[W]WW-E"))
    da.push(wdprt)
    da.push(moment(wdprt).add(1, 'days').format("YYYY-[W]WW-E"))
    da.push(moment(wdprt).add(2, 'days').format("YYYY-[W]WW-E"))
    da.push(moment(wdprt).add(3, 'days').format("YYYY-[W]WW-E"))
    return da
  }

  recData =(d)=>{
    console.log(d);
    console.log(this.state.tdata);
    let ntd = {...this.state.tdata}
    console.log(ntd);
    let days = ntd.days
    let found=false
    let ndays = days.map((day)=>{
      if(day.wdprt==d.wdprt){
        found=true
        day.hrs=d.hrs
      }
      return day
    })
    if(!found){
      ndays.push(d)
    }
    ntd.days=ndays
    console.log(ntd);
    this.setState({tdata: ntd}, ()=>{
      console.log(this.state.tdata)
      this.sumData()
    })
  }

  sumData = ()=>{
    const daysa = this.state.tdata.days
    const thrs = daysa.reduce((tot, aday)=>{
      return tot + aday.hrs*1
    },0)
    this.setState({wkhrs: thrs});
  }
  render(){
    const wdprtArr=this.updat()
    const {emailId, week, wkhrs}=this.state;
    if(emailId){
      
      return(
        <div style={style.outer}>
          <h4> TimeCard for {emailId}</h4>
          <span>week <input type="number" value={week} onChange={this.chwk} style={{width:'35px'}} />{wkhrs}</span>
          {wdprtArr.map((wdprt)=>
            <div key={wdprt.slice(-1)}>          
              <Day akey={wdprt.slice(-1)} da={wdprt} sendData={this.recData}/>
            </div>
          )}
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
