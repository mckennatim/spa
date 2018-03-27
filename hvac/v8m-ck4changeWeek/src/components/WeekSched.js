import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {ls} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {qOnMount, hookupMqtt, reset} from '../services/interface'
import {dowb}from '../services/fake'
import {Sched} from './Sched' // eslint-disable-line no-unused-vars


import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#5295b7'}
}

class WeekSched extends React.Component{
  constructor (props){
    super(props);
    this.loc= this.props.cambio.page.params.loc
    this.sr= this.props.cambio.page.params.sr
    this.state={dow:1, cursched:dowb[1].sched}
  }
  componentDidMount(){
    console.log('this.props.cambio.page.params: ',JSON.stringify(this.props.cambio.page.params))
    let urlsr = reset.urlSr(this.props)  
    let status={}
    status.prior= {sr:{}, schedobj:{}, urlsr:'dog', message:''}
    status.ischanged = false
    this.unsub = hookupMqtt(this.loc, ls, (qstate)=>{
      // prior.message=reset.readyMessage(prior.message, qstate, this)
      // console.log(qstate)
      urlsr = reset.urlSr(this.props)
      if(qstate.qdata[urlsr]){
        // console.log('status: ',JSON.stringify(status))
        let qu = qstate.qdata[urlsr]
        status = reset.ck4changeWeek(urlsr, qu, status)
        // console.log('status: ',JSON.stringify(status))
        if(status.ischanged){
          // console.log('STATUS changed',JSON.stringify(status))
          this.setState({qdata:qstate.qdata[urlsr]})
        }        
      }
      // reset.stateWhenUrlsrChanges(prior, urlsr, qstate, this, (cur)=>{
      //   console.log('CALLIngback', JSON.stringify(cur))
      //   this.setState({srrec: cur.srrec})
      // })
      // prior.sched= reset.stateWhenSchedChanges(prior.sched, cur.sched, this)
      // prior.srrec =reset.stateWhenSrrecChanges(prior.srrec, cur.srrec, this)
      // console.log('cur: ',JSON.stringify(cur))
    })
    qOnMount()
  }

  componentWillUnmount(){
    this.unsub.unsubscribe()
  }
  changeSched=(i)=>{
    // console.log(e.target, i)
    // console.log('dowb[i].sched: ',dowb[i].sched)
    let nsched = dowb[i].sched.slice()
    this.setState({days:dowb[i].days, cursched:dowb[i].sched, dow:i}, ()=>{
      // console.log('this.state.cursched: ',JSON.stringify(this.state.cursched))
    })
    
  }
  figureCurrentButton =()=>{

  }

  fetchScheds =(dev,id)=>{
    // this.setState({days:dowb[2].days, cursched:dowb[2].sched, dow:2}, ()=>{})
  }
  render (){
    if (this.state.qdata) {
      //console.log('this.state.qdata.sr: ',JSON.stringify(this.state.qdata.sr))
      let state=this.state
      if(geta('state.qdata.sr.dev',state) && state.qdata.sr.dev.length>5){
        let dev =state.qdata.sr.dev
        let id = state.qdata.sr.id
        this.fetchScheds(dev, id)
      }
    // const displaySchedButtons=()=>{
      return (
        <div style={style.outer}>
        <h4>Week Sched {this.props.cambio.page.params.loc}, {this.props.cambio.page.params.sr} </h4>
        <div>
          {dowb.map((d,i)=>{
            let nd = d.days.replace(/ /gi, '')
            let iseq = this.state.dow==i
            return(
              <button 
                key={i} onClick={this.changeSched.bind(this, i)}
                style={iseq ? {background:'#FFCDE3'}:{background:'#E1F3FC'}}
              >{nd}</button>
            )
          })}
          <Sched sched={this.state.cursched} idx={0}/>
        </div>
        </div>
      )
    }else {
      return(
        <h4>dogshit</h4>
        )
    }
  }
}
WeekSched=mapClass2Element(WeekSched)
export {WeekSched}
