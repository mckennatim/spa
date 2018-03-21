import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {ls} from '../utilities/getCfg'
import {qOnMount, hookupMqtt, reset} from '../services/interface'
import {SchedEdit} from './SchedEdit'// eslint-disable-line no-unused-vars

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
      prior.sched= reset.stateWhenSchedChanges(prior.sched, cur.sched, this)
      prior.srrec =reset.stateWhenSrrecChanges(prior.srrec, cur.srrec, this)
    })
    qOnMount()
  }

  componentWillUnmount(){
    this.unsub.unsubscribe()
  }

  modifiedSched = (ms)=>{
    console.log('ms: ',JSON.stringify(ms))
    this.setState({schedobj:ms})
  }
  render (){
    // console.log(this.props)

    if (this.state.qdata) {
      const {name, sr} = this.state.qdata
      const displaySchedule=()=>{
        if(this.state.schedobj){
          //console.log('this.state: ',JSON.stringify(this.state))
          return( 
            <SchedEdit sched={this.state.schedobj.sched} idx={this.state.schedobj.idx} fromSched={this.modifiedSched}/>
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
