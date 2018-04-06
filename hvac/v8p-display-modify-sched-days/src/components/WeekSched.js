import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {ls} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {cfg} from '../utilities/getCfg'
import {qOnMount, hookupMqtt, reset} from '../services/interface'
// import {dowb}from '../services/fake'
import {Sched} from './Sched' // eslint-disable-line no-unused-vars
import {SchedEdit} from './SchedEdit' // eslint-disable-line no-unused-vars
import {covertSchedFromDb, dayNameArr} from '../services/schedobj'


import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#5295b7'}
}

class WeekSched extends React.Component{
  constructor (props){
    super(props);
    this.loc= this.props.cambio.page.params.loc
    this.sr= this.props.cambio.page.params.sr
    this.state={dayedit: false, edit: false, dow:1, cursched:[], wsched:[], dayselected:[9,9,9,9,9,9,9,9,9]}
  }
  componentDidMount(){
    console.log('this.props.cambio.page.params: ',JSON.stringify(this.props.cambio.page.params))
    let urlsr = reset.urlSr(this.props)  
    let status={}
    status.prior= {sr:{}, schedobj:{}, urlsr:'dog', message:''}
    status.ischanged = false
    // let ischanged=false
    this.unsub = hookupMqtt(this.loc, ls, (qstate)=>{
      // prior.message=reset.readyMessage(prior.message, qstate, this)
      // console.log(qstate)
      urlsr = reset.urlSr(this.props)
      // if(qstate.qdata[urlsr]){
      // console.log('status: ',status.prior.sr.dev, 'qstate: ',qstate.qdata[urlsr].sr.dev)
      if(status.prior.sr.dev != qstate.qdata[urlsr].sr.dev || status.prior.sr.id != qstate.qdata[urlsr].sr.id){
        console.log('Shit ahs changed')
        this.setState({qdata:qstate.qdata[urlsr]})
        let qu = qstate.qdata[urlsr]
        let dev = qu.sr.dev
        let id = qu.sr.id
        status.prior.sr.dev=dev
        status.prior.sr.id=id
        if(dev.length>5){
          this.fetchScheds(dev,id)
        }
      }
    })
    qOnMount()
  }

  componentWillUnmount(){
    this.unsub.unsubscribe()
  }
  changeSched=(i)=>{
    // console.log(e.target, i)
    // console.log('dowb[i].sched: ',dowb[i].sched)
    this.setState({days:this.state.wsched[i].days, cursched:this.state.wsched[i], dow:i}, ()=>{
      // console.log('this.state.cursched: ',JSON.stringify(this.state.cursched))
    })
    
  }
  handleDaySched =()=>{
    this.setState({edit:true})
  }

  fetchScheds =(dev,id)=>{
    var lsh = ls.getItem();
    // console.log(lsh)
    console.log(dev,' ' , id)
    if(geta('lsh.token', lsh)){
      let url= cfg.url.api+'/dedata/scheds/'+dev+'/'+id
      let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          if(json.message){
            this.setState({qmessage: json.message})
          }else{
            //console.log(JSON.stringify(json))
            let wsched = covertSchedFromDb(json)
            console.log(wsched)
            this.setState({wsched: wsched, edit: false})
          }
        })   
    }else{
      let mess = `can't fetch data, you aren't authorized, maybe re-register`
      this.setState({qmessage: mess})
    }
  }

  modifiedSched =(s)=>{
    console.log(s)
    let nds = this.state.dayselected.slice()
    this.state.days.split(' ').map((d)=>{
      let idx = dayNameArr.findIndex((el)=>el==d)
      console.log(d, idx)
      nds[idx]=idx
    })
    this.setState({dayedit: true, edit: false, dayselected: nds})

  }

  save4selected=()=>{
    console.log('sav4selected', this.state.days, this.state.dayselected)
  }


  selectDay = (i)=>{
    let nds = this.state.dayselected.slice()
    if(nds[i]==i){
      nds[i]=9
    }else{
      nds[i]=i
    }
    this.setState({dayselected: nds})
  }

  displaySchedule=(schedobj)=>{
    if(schedobj.sched){
      if(!this.state.edit){
        return( 
          <div>         
          <Sched sched={schedobj.sched} idx={schedobj.idx}/>
          <button onClick={this.handleDaySched}> modify days sched</button> 
          </div>
        )
      }else{
        return(
          <SchedEdit sched={schedobj.sched} fromSched={this.modifiedSched}/>
        )
      }
    }else{
      return (<p>no schedule</p>)
    }
  }  

  displayDays=()=>{
    if (!this.state.dayedit){
      return(
        <div>
          {this.state.wsched.map((d,i)=>{
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
    }else{
      return(
        <div>
          {dayNameArr.map((d,i)=>{
            // console.log(this.state.dayselected)
            let issel = this.state.dayselected[i]==i
            return(
              <button 
                key={i} onClick={this.selectDay.bind(this, i)}
                style={issel ? {background:'#FFCDE3'}:{background:'#E1F3FC'}}
              >{d}</button>
            )            
          })}
          <button onClick={this.save4selected}> save 4 selected Days</button> 
        </div>
        )
    }
  }  

  render (){
    const ds = this.displaySchedule(this.state.cursched)
    const ddays = this.displayDays()
    if (this.state.qdata) {
      //console.log('this.state.qdata.sr: ',JSON.stringify(this.state.qdata.sr))
      return (
        <div style={style.outer}>
        <h4>Week Sched {this.props.cambio.page.params.loc}, {this.props.cambio.page.params.sr} </h4>
        {ddays}
        {ds}
        
        <span><strong>{this.state.qmessage}</strong></span>
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
