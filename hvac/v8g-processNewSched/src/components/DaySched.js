import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {ls} from '../utilities/getCfg'
import {qOnMount, hookupMqtt, reset} from '../services/interface'

import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class DaySched extends React.Component{
  constructor (props){
    super(props);
    this.loc= this.props.cambio.page.params.loc
    this.state={}
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
  render (){
    // console.log(this.props)

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
      const ds = displaySchedule()
      return(
        <div style={style.outer} >
          <h4>in DaySched of {name}</h4>
          <span>temp: {sr.temp}, relay: {sr.relay}, setpt: {sr.setpt}</span>
          {ds}
          <p>{JSON.stringify(this.props.cambio.page)}</p>
          <span><strong>{this.state.qmessage}</strong></span>
        </div>
      )
    }else{
      return(
        <div style={style.outer} >
          <h4>in DaySched for {this.loc}</h4>
          <button>better call saul</button>
        </div>
      )
    }
  }
}
DaySched=mapClass2Element(DaySched)
export {DaySched}
