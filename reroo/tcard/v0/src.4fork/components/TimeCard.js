import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {Day} from './Day'// eslint-disable-line no-unused-vars
import {ls,cfg} from '../utilities/getCfg'
import {fetchTcard, putTcard} from '../services/fetches'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class TimeCard extends React.Component{
  active='mabibi'
  state = {week:moment().week(), emailId:ls.getKey('email'), wkhrs:0, wkarr:[]}
  yr= moment().format('YYYY')
  componentDidMount(){
    this.getTimeCard(this.state.week)
  }  
  getTimeCard(wk){
    let wkarr = this.createBlWk(wk)
    fetchTcard(wk)
      .then((res)=>{
        const nwkarr = this.processRes(res,wkarr)
        this.setState({week:wk, punch:res.punch, jcost:res.jcost, wkarr:nwkarr},()=>{
        })
      })
  }

  createBlWk =(wk)=>{
    let blwk=[]
    const wdprt = `${this.yr}-W${wk.toString().padStart(2,"0")}-`
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
        const inout = JSON.parse(pu[0].inout)
        da.inout =inout
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
    const swk = nwka
      .map((da)=>{
        if (cfg.firstday!=1 && da.wdprt.slice(-1)>=cfg.firstday){
          da.wdprt= moment(da.wdprt).subtract(7, "days").format("YYYY-[W]WW-E")
        }
        return da
      })
      .sort((a,b)=>a.wdprt > b.wdprt)
    return swk
  }

  chwk=(e)=>{
    this.getTimeCard(e.target.value)
  }

  recData =(d,idx)=>{
    if (cfg.firstday!=1 && d.wdprt.slice(-1)>=cfg.firstday){
      d.wdprt= moment(d.wdprt).add(7, 'days').format("YYYY-[W]WW-E")
    }
    console.log('idx: ', idx)
    console.log(d.inout);
    console.log(JSON.stringify(d));
    let wkarr= this.state.wkarr
    wkarr[idx].inout=d.inout
    this.setState({wkarr:wkarr},()=>console.log('this.state.wkarr: ', this.state.wkarr[idx]))
    console.log('d: ', d)
    putTcard(d)
  
    //console.log(this.state.tdata);
    // let ntd = {...this.state.tdata}
    // console.log(ntd);
    // let days = ntd.days
    // let found=false
    // let ndays = days.map((day)=>{
    //   if(day.wdprt==d.wdprt){
    //     found=true
    //     day.hrs=d.hrs
    //   }
    //   return day
    // })
    // if(!found){
    //   ndays.push(d)
    // }
    // ntd.days=ndays
    // console.log(ntd);
    // this.setState({tdata: ntd}, ()=>{
    //   console.log(this.state.tdata)
    //   this.sumData()
    // })
  }

  sumData = ()=>{
    const daysa = this.state.wkarr
    const thrs = daysa.reduce((tot, aday)=>{
      return tot + aday.hrs*1
    },0)
    return thrs
  }

  prepareDayData = (d)=>{
    const{inout}=d
    console.log('in prepareDayData: ', d)
    let pin, pout, phrs, thrs=0, ioperiods=[], ioper=[], punchclock='out'
    inout.map((io,i)=>{
      if(i % 2 == 1){
        punchclock='in'
        pout = io
        phrs = io2hrs(pin,pout)
        thrs += phrs*1
        ioper.push(pout)
        ioper.push(phrs*1)
        ioperiods.splice(-1,1)
        ioperiods.push(ioper)
      }
      if(i % 2 == 0){
        pin = io
        ioper = [pin]
        ioperiods.push(ioper)
      }
    })
    if(inout.length==0){
      punchclock='in'
    } 
    return {hrs:thrs, ioperiods:ioperiods, punchclock:punchclock}
  }

  renderDays=()=>{
    const {week, wkarr}=this.state;
    const rd = wkarr.map((d, i)=>{
      const ihp = this.prepareDayData(d)
      d.hrs=ihp.hrs
      d.punchclock=ihp.punchclock
      return(
      <div key={d.wdprt.slice(-1)}>          
        <Day akey={d.wdprt.slice(-1)} da={d.wdprt} data={d} week={week} ioperiods={ihp.ioperiods} idx={i} sendData={this.recData}/>
      </div> )   
    })
    return rd
  }


  render(){
    const {emailId, week}=this.state;
    if(emailId){
      const renderedDays = this.renderDays()
      return(
        <div style={style.outer}>
          <h4> TimeCard for {emailId} {week}</h4>
          <span>week <input type="number" value={week} onChange={this.chwk} style={{width:"35px"}} />{this.sumData()}</span>
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

const io2hrs = (pin, pout)=>{
  const ti = moment.duration(moment(pout, "HH:mm").diff(moment(pin, "HH:mm")));
  const hrs = (ti._data.hours + ti._data.minutes/60).toFixed(2);  
  return hrs
}