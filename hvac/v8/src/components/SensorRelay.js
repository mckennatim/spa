import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, createSchedObj} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {qOnMount, hookupMqtt} from '../services/interface'
import {mapClass2Element} from '../hoc'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class SensorRelay extends React.Component{
  constructor (props){
    super(props);
    this.sr= this.props.cambio.page.params.sr
    this.loc= this.props.cambio.page.params.loc
    
  }

  componentDidMount(){
    let oldqstr = ''
    let newqstr = ''
    this.unsub = hookupMqtt(this.loc, ls, (qstate)=>{
      newqstr = JSON.stringify(qstate.qdata)
      // console.log('strings are equal ', (newqstr===oldqstr))
      const props = this.props
      if (!(newqstr===oldqstr) && qstate.qdata && geta('props.cambio.page.params.sr', props)) {
        this.setState({qdata:qstate.qdata[props.cambio.page.params.sr], tz:qstate.tz})
        // console.log('this.state: ',JSON.stringify(this.state))
      }
      oldqstr=newqstr
    })
    qOnMount()
  }
  componentWillUnmount(){
    this.unsub.unsubscribe()
  }  
  render(){
    // console.log('this.state: ',JSON.stringify(this.state))
    // console.log(this.state)
    const props = this.props
    if (this.state) {
      const{id,name,img,sr,sched, ts, spec}=this.state.qdata
      const{temp,relay,setpt}=sr
      const{type,diff}=spec
      // console.log('sched: ',JSON.stringify(sched))
      const schedobj = createSchedObj(sched, this.state.tz)
      //console.log(JSON.stringify(schedobj))
      const {timeleft, idx, now} = schedobj
      return(
        <div style={style.outer} >
        {/*
          */}
          <span id="name">{this.loc} <strong>{name}</strong></span>
          <span id="temp">temp: {temp}</span>
          <span id="relay">relay: {relay}</span>
          <span id="setpt">setpt: {setpt}</span>
          <span id="ts">{Date(ts)}</span>
          <span id="id">{id} {img}</span>
          <span id="spec">type: {type}, diff: {diff}</span>
          <span id="tin">timeleft: {timeleft}, idx: {idx}, now: {now}</span>
          <ul>
          {schedobj.sched.map((s,i)=>{
            let ieq = i==idx
            return(
              <li key={i}><span style={ieq ? {color:'green'}:{color:'blue'}}>{s.time} {s.setpt}</span></li>
              )
            })
          }
          </ul>
        </div>
      )
    }else{
      return(
        <div style={style.outer} >
          <h4>in SensorRelay for {this.loc}</h4>
          <button>better call saul</button>
        </div>
      )
    }
  }
}

SensorRelay=mapClass2Element(SensorRelay)

export {SensorRelay}
