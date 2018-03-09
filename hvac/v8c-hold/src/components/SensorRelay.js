import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, createSchedObj, modifySched} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {qOnMount, hookupMqtt, mqtt$nextPublish} from '../services/interface'
import {mapClass2Element} from '../hoc'
import {isEqual} from 'underscore'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class SensorRelay extends React.Component{
  constructor (props){
    super(props);
    this.sr= this.props.cambio.page.params.sr
    this.loc= this.props.cambio.page.params.loc
    this.state={boostValue: 6, boostType:'cmd', holdTemp: 54}
    
  }

  componentDidMount(){
    // let oldqstr = ''
    // let newqstr = ''    
    let old = {sr:{}, sched:[], id:''}
    // let nuu = {sr:{}, sched:[], id:''}
    this.unsub = hookupMqtt(this.loc, ls, (qstate)=>{
      /*
      every time qstate changes (by qactions grabSrStateData & grabSchedData)
      we listen. qstate contains devs, qdata & tz. qdata contains [kid, lr, etc], each with id. name, img, sched, spec {temp, diff}, sr {temp, relay, setpt id, dev, timeleft}, ts
      case !isEqual(old.id,props.cambio.page.params.sr)
      */

      if(geta('qstate.readystate.message',qstate)){
        this.setState({qmessage: qstate.readystate.message})
      }      
      const props = this.props
      let currid= geta('props.cambio.page.params.sr', props)
      let currsr, currsched 
      if (qstate.qdata && currid) { 
        currsr = qstate.qdata[currid].sr     
        currsched = qstate.qdata[currid].sched    
        if(!isEqual(old.id,currid)){
          this.setState({qdata:qstate.qdata[currid], tz:qstate.tz})
        }
        if(this.state.qdata && !isEqual(old.sched,currsched)){
          const schedobj = createSchedObj(currsched, this.state.tz)
          this.setState({schedobj:schedobj})
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
    qOnMount()
  }
  componentWillUnmount(){
    this.unsub.unsubscribe()
  } 
  handleBoostChange=(event)=>{
    this.setState({boostValue: event.target.value, boostType: "prg"});
  }
  handleBoostDelayChange=(event)=>{
    console.log('delay event.target.value: ',JSON.stringify(event.target.value))
    this.setState({boostDelay: event.target.value})
  }
  handleBoRadio =(event)=>{
    this.setState({boostType: event.target.value});
  }
  handleBoost=()=>{
    let boostFor
    if("prg"===this.state.boostType){
      boostFor=this.convertBoostVal(this.state.boostValue)
      const schedmod = modifySched(this.state.qdata.sched, this.state.tz, this.state.schedobj, boostFor, this.state.boostDelay)
      console.log(JSON.stringify(schedmod))
      let topic = this.state.qdata.sr.dev+'/prg'
      let message = {id:this.state.qdata.sr.id, pro:schedmod}
      mqtt$nextPublish(topic,message)      
    }else{
      boostFor=this.state.schedobj.timeleft
      let topic = this.state.qdata.sr.dev+'/cmd'
      let message = {id:this.state.qdata.sr.id, sra:[69,67]}
      mqtt$nextPublish(topic,message)
    }
    console.log('setBoost on ',this.state.boostType, ' for ', boostFor)
  }

  convertBoostVal = (v)=>{
    let h = Math.floor(v)
    let m = (v%h)*60
    return `${h}:${m}`
  }

  handleHold =(event)=>{
    console.log(event.target.value)
  }
  handleHoldDate =(event)=>{
    console.log(event.target.value)
  }
  handleHoldTime =(event)=>{
    console.log(event.target.value)
  }
  handleHoldTempChange = (event)=>{
    this.setState({holdTemp:event.target.value})
  }

  render(){
    if (this.state.qdata) {

      const{id,name,img,sr,ts, spec}=this.state.qdata
      const{temp,relay,setpt}=sr
      const{type,diff}=spec
      let timeleft,idx,now,schedarr
      const displaySchedule=()=>{
        if(this.state.schedobj){
          timeleft = this.state.schedobj.timeleft
          idx = this.state.schedobj.idx
          now = this.state.schedobj.now
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
        {/*
          */}
          <span id="name"><strong>{name}</strong></span>
          <span id="temp">temp: {temp} relay:{relay}</span>
          <button>home</button>
          <span>setpt at {setpt} for next {timeleft}</span>
          <button>modify sched</button>    
          {ds}      
          {/*

          */}
          <button onClick={this.handleBoost}>boost</button>
          <input type="radio" name="boofo" value="cmd" checked={this.state.boostType==="cmd"} onChange={this.handleBoRadio}/> 
          for {timeleft} 
          <input type="radio" name="boofo" value="prg" checked={this.state.boostType==="prg"} onChange={this.handleBoRadio}/>
          {this.convertBoostVal(this.state.boostValue)}
          <input type="range" min="1" max="12" step=".25" value={this.state.boostValue} onChange={this.handleBoostChange}/>
          delay boost til
          <input type="time" onChange={this.handleBoostDelayChange}/>
          <span id="ts">{Date(ts)}</span>
          <button onClick={this.handleHold}>hold til</button>
          at {this.state.holdTemp} temp
          <input type="range" min="50" max="70" step="1" value={this.state.holdTemp} onChange={this.handleHoldTempChange}/> 
          until
          <input type="date" onChange={this.handleHoldDate}/><input type="time" onChange={this.handleHoldTime}/>
          <span id="id">{id} {img}</span>
          <span id="spec">type: {type}, diff: {diff} id:{sr.id} dev:{sr.dev}</span>
          <span id="now">{now}</span>
          <span><strong>{this.state.qmessage}</strong></span>
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
