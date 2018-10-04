import React from 'react';
var moment = require('moment');
import {TimeCard} from './TimeCard'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchTcard, putTcardWk, fetchSettings} from '../services/fetches'
import {drnd} from '../utilities/wfuncs'
import {ls, makeHref} from '../utilities/getCfg'

class TimeCardJar extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    gottcard:false,
    week:moment().week(),
    yr:moment().format('YYYY'),
    blabel:'xxx'
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
          this.setState({qmessage:res.qmessage})
          //window.alert(res.qmessage)
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
          this.setState({qmessage:res.qmessage})
          //window.alert(res.qmessage)
        }else{
          res = this.reCalcStatus(res)
          this.setState({tcard:res, gottcard:true, showsub:this.setShowSub(res)})
        }
      })
  }

  handleWeekChanged = (wk)=>{
    this.setState({week:wk})
    this.getTimeCard(wk)
  }

  setShowSub =(tcard)=>{
    let showsub=false
    if(tcard.wstat && tcard.wstat.status=='ready'){
      showsub=true
    }
    return showsub
  }

  handleTcardChanges=(cmd,chobj)=>{
    let modtcard = {...this.state.tcard}
    console.log('modtcard: ', modtcard)
    let wkarr = modtcard.wkarr.slice()
    const idx = chobj.idx
    if (cmd=='iopu'){
      let hrs =  modtcard.hrs.slice()
      hrs[idx] = chobj.hrs
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
    console.log('modtcard.wstat: ', modtcard.wstat)
    putTcardWk(modtcard.wstat)
    this.setState({tcard:modtcard})      
  }

  reCalcStatus =(modtcard)=>{
    const {hrs, jchrs, wstat}=modtcard
    let modwstat= {...wstat}
    const wkpuhrs=drnd(hrs.reduce((t,h)=>t+h,0))
    const wkjchrs= drnd(jchrs.reduce((t,h)=>t+h,0))// eslint-disable-line no-unused-vars
    const st = hrs //[1,0,1,0,1,1,1]
      .map((h,i)=>h==jchrs[i])
      .reduce((t,j)=>t+j,0)
    let status=modwstat.status
    let showsub, blabel 
    if(st<7 || wkpuhrs==0){
      status = 'inprocess'
      showsub=false
    }else if(status=='submitted' || status=='approved' || status=='paid'){
      showsub=false
    }else{
      status = 'ready'
      showsub=true
      blabel= 'submit'
    }
    modwstat={...modwstat, status:status, hrs:wkpuhrs, hrsarr:JSON.stringify(hrs)}
    modtcard={...modtcard, wstat:modwstat}
    this.setState({showsub, blabel})
    return modtcard
  }


  renderTimecard = ()=>{
    if(this.state.gottcard){
      return (
        <TimeCard week={this.state.week} yr={this.state.yr} tcard={this.state.tcard} ismobile={this.props.responsive.ismobile} showsub={this.state.showsub} blabel={this.state.blabel} tcardChanges={this.handleTcardChanges} weekChanged={this.handleWeekChanged}/>
      )
    }else{
      return(
        <div style={style.he}>
          <p>Message from server: {this.state.qmessage}. </p><br/> <p> The link below will take you home where you will be asked to re-register. This will take you to a list of apps you can use in your company. If you are registered in more than one company, you can choose your company first. <a href={makeHref(location.hostname, 'signup', '#urapps')} >HOME</a></p> 
          
        </div>
        )
    }
  }
  
  render() {
    const tcard = this.renderTimecard()
    return ( 
      <div >
        <div>
          {tcard}
        </div>
      </div>
    );
  }
}

TimeCardJar=mapClass2Element(TimeCardJar)
 
export {TimeCardJar} ;

const style = {
  he:{
    overflow:'hidden',
    margin: '2px 10px 10px 10px',
    padding: '4px'
  }
}