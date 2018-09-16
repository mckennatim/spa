import React from 'react';
var moment = require('moment');
import {TimeCard} from './TimeCard'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchTcard, putTcardWk, fetchSettings} from '../services/fetches'
import {drnd} from '../utilities/wfuncs'
import {ls} from '../utilities/getCfg'

class TimeCardJar extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    gottcard:false,
    week:moment().week(),
    yr:moment().format('YYYY')
  }

  componentDidMount(){
    this.getSettings()
    this.getTimeCard(this.state.week)
  }

  getSettings=()=>{
    fetchSettings() 
      .then((res)=>{
        if (res.qmessage){
          console.log('res.qmessage: ', res.qmessage)
          window.alert(res.qmessage)
        }else{        
          ls.modItem('firstday', res.firstday)
        }
    })
  }

  getTimeCard(wk){
    fetchTcard(wk)
      .then((res)=>{
        this.emailId=res.emailid
        if (res.qmessage){
          console.log('res.qmessage: ', res.qmessage)
          window.alert(res.qmessage)
        }else{
          console.log('res: ', res)
          console.log('this.setShowSub(res): ', this.setShowSub(res))
          this.setState({tcard:res, gottcard:true, showsub:this.setShowSub(res)})
        }
      })
  }

  setShowSub =(tcard)=>{
    let showsub=false
    if(tcard.wstat.status=='ready'){
      showsub=true
    }
    return showsub
  }

  handleTcardChanges=(cmd,chobj)=>{
    console.log('chobj: ', chobj)
    let modtcard = {...this.state.tcard}
    let wkarr = modtcard.wkarr.slice()
    const idx = chobj.idx
    if (cmd=='iopu'){
      let hrs =  modtcard.hrs.slice()
      hrs[idx] = chobj.hrs
      console.log('hrs: ', hrs)
      wkarr[idx].hrs = chobj.hrs
      wkarr[idx].inout =chobj.inout
      modtcard.wkarr = wkarr
      modtcard.hrs = hrs
      modtcard = this.reCalcStatus(modtcard)
    }
    if (cmd=='jcost'){
      let jchrs =  modtcard.jchrs.slice()
      const njcost = chobj.jcost.slice()
      // njcost=[{ job: "105 Green St", cat: null, hrs: 2 }]
      const sumhrs = drnd(njcost.reduce((t,j)=>j.hrs+t, 0))
      jchrs[idx]=sumhrs
      wkarr[idx].jcost=njcost
      wkarr[idx].jchrs=sumhrs
      modtcard.wkarr = wkarr
      modtcard.jchrs = jchrs
      modtcard = this.reCalcStatus(modtcard)
    }
    if(cmd=='submit'){
      let modwstat= {...modtcard.wstat}
      modwstat.status=chobj.status
      modtcard.wstat=modwstat
      this.setState({showsub:false})
    }
    putTcardWk(modtcard.wstat)
    this.setState({tcard:modtcard})      
  }

  reCalcStatus =(modtcard)=>{
    const {hrs, jchrs, wstat}=modtcard
    let modwstat= {...wstat}
    console.log('hrs array: ', hrs)
    console.log('jchrs array: ', jchrs)
    const wkpuhrs=drnd(hrs.reduce((t,h)=>t+h,0))
    const wkjchrs= drnd(jchrs.reduce((t,h)=>t+h,0))// eslint-disable-line no-unused-vars
    const st = hrs //[1,0,1,0,1,1,1]
      .map((h,i)=>h==jchrs[i])
      .reduce((t,j)=>t+j,0)
    let status
    let showsub 
    if(st<7 || wkpuhrs==0){
      status = 'inprocess'
      showsub=false
    }else{
      status = 'ready'
      showsub=true
    }
    console.log('status: ', status)
    modwstat={...modwstat, status:status, hrs:wkpuhrs}
    modtcard={...modtcard, wstat:modwstat}
    this.setState({showsub})
    return modtcard
  }


  renderTimecard = ()=>{
    if(this.state.gottcard){
      return (
        <TimeCard week={this.state.week} yr={this.state.yr} tcard={this.state.tcard} ismobile={this.props.responsive.ismobile} showsub={this.state.showsub} tcardChanges={this.handleTcardChanges}/>
      )
    }
  }
  
  render() {
    const tcard = this.renderTimecard()
    return ( 
      <div >
        <div style={style.he}>
          <div style={style.he.title}>TimeCardJar</div>
        </div>
 
        <div>
          {tcard}
        </div>
      </div>
    );
  }
}

TimeCardJar=mapClass2Element(TimeCardJar)
 
export {TimeCardJar} ;

let style={
  he:{
    height:'60px',
    background:'grey',
    title:{
      float: 'right'
    }
  },
  subm:{
    div:{
      overflow:'hidden',
      background: 'silver'
    },
    ul:{
      width: '98%',
      padding: '5px',
      listStyle: 'none',
      float: 'left'
    },
    li:{
      overflow:'hidden',
      padding: '6px',
      border:'1px solid',
      id:{
        float: 'left'
      },
      stat: {
        float: 'right'
      }
    }
  }
}