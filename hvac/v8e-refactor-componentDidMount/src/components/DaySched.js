import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {ls, createSchedObj} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {hookupMqtt} from '../services/interface'
import {isEqual} from 'underscore'

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
    let old = {sr:{}, sched:[], id:''}
    this.unsub = hookupMqtt(this.loc, ls, (qstate)=>{
      // console.log(qstate)
      if(geta('qstate.readystate.message',qstate)){
        this.setState({qmessage: qstate.readystate.message})
        console.log(qstate.readystate.message)
      }
      const props = this.props
      let currid= geta('props.cambio.page.params.sr', props)
      let currsr, currsched 
      if (qstate.qdata && currid) { 
        currsr = qstate.qdata[currid].sr     
        currsched = qstate.qdata[currid].sched 
        //console.log('currsched: ',JSON.stringify(currsched))  
        if(!isEqual(old.id,currid)){
          this.setState({qdata:qstate.qdata[currid], tz:qstate.tz})
        }
        if(this.state.qdata && !isEqual(old.sched,currsched)){
          const schedobj = createSchedObj(currsched, this.state.tz)
          this.setState({schedobj:schedobj})
          this.resetTimer(schedobj.timeleft)
        }
        if(this.state.qdata && !isEqual(old.sched,currsr)){
          this.state.qdata.sr = currsr
          this.setState({qdata:this.state.qdata})
        }
        old.id=currid
        old.sr=currsr
        old.sched=currsched
      }               
    })
  }

  componentWillUnmount(){
    this.unsub.unsubscribe()
  }
  render (){
    if (this.state.qdata) {
      return(
        <div style={style.outer} >
          <h4>in DaySched </h4>
          <p>{JSON.stringify(this.props)}</p>
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
