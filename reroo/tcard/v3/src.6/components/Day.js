import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {putTcard, delTcardPu} from '../services/fetches'
import {JobCost} from './JobCost'// eslint-disable-line no-unused-vars

const style={
  tcardDiv:{
    border: '2px solid black'
  }
} 

class Day extends React.Component {// eslint-disable-line no-unused-vars
  state={punch:'in'}
  tinel =null
  hrs=0
    componentDidMount(){
    this.tinel = document.getElementById('tin'+this.props.data.idx)
    this.setPunch()
  } 

  setPunch =()=>{
    if(this.props.data.inout.length % 2 == 0 || this.props.data.inout.length==0){
      return 'in'
    }else{
      return 'out'
    }
  }

  appendTime=()=>{
    console.log('this.tin.value: ', this.tinel.value)
    const ndata = {...this.props.data}
    ndata.inout.push(this.tinel.value)
    ndata.hrs=resumHrs(ndata.inout)
    console.log('ndata: ', ndata)
    console.log('resumHrs(ndata.inout): ', resumHrs(ndata.inout))
    this.setPunch()
    this.props.dayChanges('punch',ndata)
    putTcard(ndata)
  }

  delDayPu =(e)=>{
    const wdprt=e.target.getAttribute("wdprt")
    console.log('in delDayPu: ', wdprt)
    this.props.dayChanges('delpu',wdprt)
    delTcardPu(wdprt)
  }

  renderIoList =(data)=>{
    const perarr = createPeriodArray(data.inout)
    return (
    <div>
      {perarr.map((per,i)=>{
        return(
        <div key={i}>{per[0]} -> {per[1]}  = {per[2]}</div>
        )
      })
      }
    </div>
    )
  }

  handleJcChanges=(ch)=>{
    console.log('ch: ', ch)
  }

  render() { 
    const tin= 'tin'+this.props.data.idx
    const {week, data}=this.props
    
    const {hrs, wdprt, jcost, jchrs}=data
    const punch = this.setPunch()
    const inoutList = this.renderIoList(data)
    //const hrs = this.renderHrs(data)
    return ( 
      <div style={style.tcardDiv}>
        <span >{week} {moment(data.wdprt).format('ddd MM/DD/YY E')}</span><span wdprt={wdprt} onClick={this.delDayPu}>X</span><br/>
        <button onClick={this.appendTime}>{punch}</button>
        <input id={tin} type="time" />{hrs}<br/>
        {inoutList}
        <JobCost jcost={jcost} jchrs={jchrs} jcChanges={this.handleJcChanges}/>
      </div>
     );
  }


}

export{Day}

const io2hrs = (pin, pout)=>{
  const ti = moment.duration(moment(pout, "HH:mm").diff(moment(pin, "HH:mm")));
  const hrs = (ti._data.hours + ti._data.minutes/60).toFixed(2);  
  return hrs
}

const createPeriodArray = (inout)=>{
  let pin, pout, phrs, ioperiods=[], ioper=[]
  inout.map((io,i)=>{
    if(i % 2 == 1){
      pout = io
      phrs = io2hrs(pin,pout)
      ioper.push(pout)
      ioper.push(phrs*1)
      ioperiods.splice(-1,1)
      ioperiods.push(ioper)
    }
    if(i % 2 == 0){
      pin = io
      ioper = [pin]
      ioperiods.push(ioper)
    }
  }) 
  return ioperiods
}

const resumHrs = (inout)=>{
  let pin, pout, phrs, thrs=0
  inout.map((io,i)=>{
    if(i % 2 == 1){
      pout = io
      phrs = io2hrs(pin,pout)
      thrs += phrs*1
    }
    if(i % 2 == 0){
      pin = io
    }
  }) 
  return thrs  
}