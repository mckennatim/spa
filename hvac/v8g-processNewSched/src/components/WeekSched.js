import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {ls} from '../utilities/getCfg'
import {qOnMount, hookupMqtt, reset} from '../services/interface'
import {dn,dn2,dowb}from '../services/fake'


import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#5295b7'}
}

class WeekSched extends React.Component{
  constructor (props){
    super(props);
    this.loc= this.props.cambio.page.params.loc
    this.state={dow:1, cursched:dowb[1].sched}
  }
  componentDidMount(){
    let prior = {srrec:{}, sched:[], urlsr:'', message:''}
    this.unsub = hookupMqtt(this.loc, ls, (qstate)=>{
      reset.readyMessage(prior, qstate, this)
      let urlsr = reset.urlSr(this.props)
      let cur = reset.stateWhenUrlsrChanges(prior, urlsr, qstate, this)
      reset.stateWhenSchedChanges(prior.sched, cur.sched, this)
      reset.stateWhenSrrecChanges(prior.srrec, cur.srrec, this)
    })
    qOnMount()
  }

  componentWillUnmount(){
    this.unsub.unsubscribe()
  }
  changeSched=(i, e)=>{
    console.log(e.target, i)
    console.log('dowb[i].sched: ',dowb[i].sched)
    this.setState({days:dowb[i].days, cursched: dowb[i].sched, dow:i})
  }

  render (){
    // console.log(this.props)
    const displaySchedButtons=()=>{
      return (
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
        </div>
      )
    }
    if (this.state.qdata) {
      const {name, sr} = this.state.qdata
      let idx,schedarr
      const displaySchedule=()=>{
        if(this.state.schedobj){
          idx = this.state.schedobj.idx
          schedarr = this.state.schedobj.sched
          return(          
            <ul>
            {schedarr.map((s,i)=>{
              let ieq = i==idx
              return(
                <li key={i}><span style={ieq ? {color:'green'}:{color:'blue'}}>{s.time} {s.setpt}</span></li>
                )
              })
            }
            </ul>            
          )
        }else{
          return (<p>no schedule</p>)
        }
      } 

      const db =  displaySchedButtons()    
      const ds = displaySchedule()
      return(
        <div style={style.outer} >
          <h4>in WeekSched of {name}</h4>
          <button>def   WF   Th   S   Su   MT   hld</button><button>Th</button>
          <span>temp: {sr.temp}, relay: {sr.relay}, setpt: {sr.setpt}</span>
          {ds}
          <p>{JSON.stringify(this.props.cambio.page)}</p>
          {this.state.days}
          {db}
          {this.state.cursched[0].time}
          <span><strong>{this.state.qmessage}</strong></span>
          
          
        </div>
      )
    }else{
      return(
        <div style={style.outer} >
          <h4>in WeekSched for {this.loc}</h4>
          <button>better call saul</button>
        </div>
      )
    }
  }
}
WeekSched=mapClass2Element(WeekSched)
export {WeekSched}
