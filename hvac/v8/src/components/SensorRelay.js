import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, cfg, modifySched, insertHold} from '../utilities/getCfg'
import {qOnMount, hookupMqtt, mqtt$nextPublish, reset} from '../services/interface'
import {mapClass2Element} from '../hoc'
import moment from 'moment-timezone'
import {router} from '../app'
import {Sched} from './Sched' // eslint-disable-line no-unused-vars
import {SchedEdit} from './SchedEdit' // eslint-disable-line no-unused-vars
// import {sendCopyOfSchedobj} from '../services/schedobj'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class SensorRelay extends React.Component{
  constructor (props){
    super(props);
    this.sr= this.props.cambio.page.params.sr
    this.loc= this.props.cambio.page.params.loc
    this.state={boostValue: 6, boostType:'cmd', holdTemp: 54, fornext:'00:00', edit:false}
    this.timr
    this.dow
  }

  componentDidMount(){
    let curr = moment()
    let curhr = curr.format('H:mm') 
    let holdDate =curr.add(14, 'days').format('YYYY-MM-DD')
    this.setState({boostDelay:curhr, holdTime:curhr, holdDate:holdDate})   
    let prior = {srrec:{}, sched:[], urlsr:'', message:''}
    this.unsub = hookupMqtt(this.loc, ls, (qstate)=>{
      reset.readyMessage(prior, qstate, this)
      let urlsr = reset.urlSr(this.props)
      let cur = reset.stateWhenUrlsrChanges(prior, urlsr, qstate, this)
      prior.sched=reset.stateWhenSchedChanges(prior.sched, cur.sched, this)
      prior.srrec=reset.stateWhenSrrecChanges(prior.srrec, cur.srrec, this)
      reset.timer(this)//need this.timr and this.state.fornext:'00:00' in constructor
    })
    qOnMount()
  }
  componentWillUnmount(){
    this.unsub.unsubscribe()
    clearInterval(this.tmr)
  }

  handleBoostChange=(event)=>{
    this.setState({boostValue: event.target.value, boostType: "prg"});
  }
  handleBoostDelayChange=(event)=>{
    // console.log('delay event.target.value: ',JSON.stringify(event.target.value))
    this.setState({boostDelay: event.target.value})
  }
  handleBoRadio =(event)=>{
    this.setState({boostType: event.target.value});
  }
  handleBoost=()=>{
    let boostFor
    if("prg"===this.state.boostType){
      boostFor=this.convertBoostVal(this.state.boostValue)
      const schedmod = modifySched(this.state.qdata.sched, this.state.tz, boostFor, 68, this.state.qdata.spec.diff, this.state.boostDelay)
      // console.log(JSON.stringify(schedmod))
      let topic = this.state.qdata.sr.dev+'/prg'
      let message = {id:this.state.qdata.sr.id, pro:schedmod}
      mqtt$nextPublish(topic,message)      
    }else{
      boostFor=this.state.schedobj.timeleft
      let topic = this.state.qdata.sr.dev+'/cmd'
      let message = {id:this.state.qdata.sr.id, sra:[69,67]}
      mqtt$nextPublish(topic,message)
    }
    // console.log('setBoost on ',this.state.boostType, ' for ', boostFor)
  }

  convertBoostVal = (v)=>{
    let h = Math.floor(v)
    let m = (v%h)*60
    return `${h}:${m}`
  }

  handleHold =()=>{
    const holdTemp = this.state.holdTemp
    const diff = this.state.qdata.spec.diff
    const holdobj = insertHold(this.state.qdata.sched, this.state.tz, holdTemp, diff)
    const { schedmod, temparr} =holdobj
    let myuntil = this.state.holdDate+' '+this.state.holdTime
    let holdarr = [[0,0].concat(temparr)]
    // console.log(JSON.stringify(schedmod))
    // console.log('holdarr: ', JSON.stringify(holdarr))
    // console.log('myuntil: ', myuntil)
    let topic = this.state.qdata.sr.dev+'/prg'
    let message = {id:this.state.qdata.sr.id, pro:schedmod}
    mqtt$nextPublish(topic,message) 
    //in order to send in a new schedule 
    let lsh = ls.getItem();
    // console.log(JSON.stringify([[0,0,holdTemp*1+diff/2, holdTemp*1-diff/2]]))
    const pl ={
      devid: this.state.qdata.sr.dev,
      dow: 8,
      senrel:this.state.qdata.sr.id,
      sched: JSON.stringify(holdarr),
      until:myuntil
    }
    // console.log('pl: ',JSON.stringify(pl))
    let url= cfg.url.api+'/dedata/prg'
    let options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(pl)
    }
    fetch(url, options)
    .then(()=>{
    })
  }
  handleHoldDate =(event)=>{
    console.log(event.target.value)
    this.setState({holdDate: event.target.value});
  }
  handleHoldTime =(event)=>{
    console.log(event.target.value)
    this.setState({holdTime: event.target.value});
  }
  handleHoldTempChange = (event)=>{
    this.setState({holdTemp:event.target.value})
  }

  handleDaySched =()=>{
    this.setState({edit:true})
  }

  modifiedSched =(s)=>{
    console.log('s: ',JSON.stringify(s))
    this.setState({edit:false})

  }
  handleWeekSched =()=>{
    let sr = this.props.cambio.page.params.sr
    let loc = this.props.cambio.page.params.loc
    router.navigate(`sched/${loc}/${sr}`)
  }

  render(){
    // console.log(this.state)
    const displaySchedule=()=>{
      if(this.state.schedobj){
        if(!this.state.edit){
          return(          
            <Sched sched={this.state.schedobj.sched} idx={this.state.schedobj.idx}/>
          )
        }else{
          return(
            <SchedEdit sched={this.state.schedobj.sched} fromSched={this.modifiedSched}/>
          )
        }
      }else{
        return (<p>no schedule</p>)
      }
    }    
    if (this.state.qdata) {
      // console.log('this.state.qdata: ',JSON.stringify(this.state.qdata))
      // console.log('this.state.schedobj: ',JSON.stringify(this.state.schedobj))
      const{id,name,img,sr,ts, spec}=this.state.qdata
      const{temp,relay,setpt}=sr
      const{type,diff}=spec
      let timeleft,now


      const ds = displaySchedule()

      return(
        <div style={style.outer} >
        {/*
          */}
          <span id="name"><strong>{name}</strong></span>
          <span id="temp">temp: {temp} relay:{relay}</span>
          <button>home</button>
          <span>setpt at {setpt} for next {this.state.fornext}</span>
          <button onClick={this.handleWeekSched}> modify weeks sched</button>    
          <button onClick={this.handleDaySched}> modify days sched</button>    
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
          <input type="time" value={this.state.boostDelay} onChange={this.handleBoostDelayChange}/>
          <span id="ts">{Date(ts)}</span>
          <button onClick={this.handleHold}>hold til</button>
          at {this.state.holdTemp} temp
          <input type="range" min="50" max="70" step="1" value={this.state.holdTemp} onChange={this.handleHoldTempChange}/> 
          until
          <input type="date" value={this.state.holdDate} onChange={this.handleHoldDate}/><input type="time" value={this.state.holdTime} onChange={this.handleHoldTime}/>
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
