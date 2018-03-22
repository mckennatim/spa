import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {ls} from '../utilities/getCfg'
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
    this.state={dow:1, cursched:dowb[1].sched}
  }
  componentDidMount(){
    console.log('this.props.cambio.page.params: ',JSON.stringify(this.props.cambio.page.params))
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
  changeSched=(i)=>{
    // console.log(e.target, i)
    // console.log('dowb[i].sched: ',dowb[i].sched)
    let nsched = dowb[i].sched.slice()
    this.setState({days:dowb[i].days, cursched: nsched, dow:i}, ()=>{
      // console.log('this.state.cursched: ',JSON.stringify(this.state.cursched))
    })
    
  }
  figureCurrentButton =()=>{

  }
  render (){
      // console.log('this.state.cursched: ',JSON.stringify(this.state.cursched))
    // const displaySchedButtons=()=>{
      return (
        <div style={style.outer}>
        <h4>Week Sched</h4>
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
  }
}
WeekSched=mapClass2Element(WeekSched)
export {WeekSched}
