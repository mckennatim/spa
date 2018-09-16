import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {Day} from './Day'// eslint-disable-line no-unused-vars
import {ls,cfg} from '../utilities/getCfg'
import {fetchTcard} from '../services/fetches'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class TimeCard extends React.Component{
  active='mabibi'
  state = {week:moment().week(), emailId:ls.getKey('email')}
  yr= moment().format('YYYY')
  componentDidMount(){
    this.getTimeCard(this.state.week)
  }  
  getTimeCard(wk){
    let wkarr = this.createBlWk(wk)
    console.log(wkarr);
    fetchTcard(wk)
      .then((res)=>{
        const nwkarr = this.processRes(res,wkarr)
        this.setState({week:wk, punch:res.punch, jcost:res.jcost, wkarr:nwkarr},()=>{
          console.log(this.state);
        })
      })
  }

  createBlWk =(wk)=>{
    let blwk=[]
    const wdprt = `${this.yr}-W${wk.toString().padStart(2,'0')}-`
    for (let i=1;i<=7;i++){
      let obj = {wdprt:wdprt+i, hrs:0, inout:[], jcost:[]}
      blwk.push(obj)
    }
    return blwk
  }
  
  processRes=(res,wkarr)=>{
    const nwka = wkarr.map((da)=>{
      const pu = res.punch.filter((pu)=>da.wdprt==pu.wdprt)
      if(pu.length>0){
        da.inout=pu[0].inout
        da.hrs=pu[0].hrs
      }
      const joc = res.jcost
        .filter((jc)=>da.wdprt==jc.wdprt)
        .map((cj)=>{
          return {job:cj.job, cat:cj.cat, hrs:cj.hrs}
        })
      da.jcost = joc  
      return da
    })
    return this.sortWk(nwka);
  }

  sortWk = (nwka)=>{
    console.log(cfg.firstday, nwka);
    const swk = nwka
      .map((da)=>{
        if (cfg.firstday!=1 && da.wdprt.slice(-1)>=cfg.firstday){
          da.wdprt= moment(da.wdprt).subtract(7, 'days').format("YYYY-[W]WW-E")
        }
        return da
      })
      .sort((a,b)=>a.wdprt > b.wdprt)
    return swk
  }

  chwk=(e)=>{
    this.getTimeCard(e.target.value)
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
