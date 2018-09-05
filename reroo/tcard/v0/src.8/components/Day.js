import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {putTcard, delTcardPu} from '../services/fetches'
import {JobCost} from './JobCost'// eslint-disable-line no-unused-vars

const style={
  tcardDiv:{
    border: '2px solid black'
  },
  punchclock:{
    container:{
      padding:'2px',
      border: '2px green solid',
      borderRadius: '12px',
      float: 'left',
      background: 'white'
    },
    input:{
      borderRadius: '0px 0px 12px 12px'
    },
    button:{
      borderRadius: '12px 12px 0px 0px',
      width: '100px',
      background: 'white'
    }
  },
  daydate:{
    container:{
      float:'left'
    },
    day:{
      fontSize: '25px'
    }
  },
  hrs:{
    div:{
      float: 'right'
    },
    span:{
      fontSize: '18px'
    }
  }
} 

class Day extends React.Component {// eslint-disable-line no-unused-vars
  
  tinel =null
  hrs=0
  list = 'empty'
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
    if(this.tinel.value.length!=5){
      window.alert('could you check that you entered a time before hitting the punch clock')
    }else{
      const ndata = {...this.props.data}
      ndata.inout.push(this.tinel.value)
      ndata.hrs=resumHrs(ndata.inout)
      console.log('ndata: ', ndata)
      console.log('resumHrs(ndata.inout): ', resumHrs(ndata.inout))
      this.setPunch()
      this.props.dayChanges('punch',ndata)
      putTcard(ndata)
    }
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
    console.log('this.props.data.idx: ', this.props.data.idx)
    console.log('this.props.data.wdprt: ', this.props.data.wdprt)
    this.props.dayChanges('jcost',{idx:this.props.data.idx, jcost:ch})
    const rec = {wdprt:this.props.data.wdprt, jcosts:ch}
    console.log('rec: ', JSON.stringify(rec))
  }



  render() { 
    const tin= 'tin'+this.props.data.idx
    const {data, jobs}=this.props
    const {hrs, jcost, jchrs}=data
    const punch = this.setPunch()
    const inoutList = this.renderIoList(data)
    return ( 
      <div style={style.tcardDiv}>
        <div style={style.daydate.container}>
          <span style={style.daydate.day}> {moment(data.wdprt).format('ddd')} </span><br/>
          <span>  {moment(data.wdprt).format('MM/DD/YY')}</span>
        </div>
        <div style={style.hrs.div} onClick={this.delDayPu}> <span style={style.hrs.span}>{hrs}</span>  X </div>
        <div style={style.punchclock.container}>
          <button style={style.punchclock.button} onClick={this.appendTime}>punch {punch}</button><br/>
          <input style={style.punchclock.input} id={tin} type="time" /><br/>
        </div>
        in out hrs x
        {inoutList}
        <JobCost jcost={jcost} jchrs={jchrs} puhrs={hrs} jobs={jobs} jcChanges={this.handleJcChanges}/>
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