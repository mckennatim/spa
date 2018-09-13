import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {putTcard, putTcardJc, delTcardPu} from '../services/fetches'
import {JobCost} from './JobCost'// eslint-disable-line no-unused-vars



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

  ifNotMobileAppend =()=>{
    if(!this.props.ismobile){
      this.appendTime()
    }
  }  

  ifMobileAppend =()=>{
    if(this.props.ismobile){
      this.appendTime()
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
      //this.props.dayChanges('iopu',ndata)
      putTcard(ndata)
    }
  }

  delDayPu =(ndata)=>{
    delTcardPu({ndata})
    this.props.dayChanges('delpu',ndata)
    //this.props.dayChanges('iopu',ndata)
    ndata.inout=[]
    ndata.hrs = 0
  }
  
  handleJcChanges=(ch)=>{
    if(ch.cmd=='jcost'){
      
      const wdprt = this.props.data.wdprt
      this.props.dayChanges('jcost',{idx:this.props.data.idx, jcost:ch.jcost})
      const rec = {wdprt:wdprt, jcost:ch.jcost}
      putTcardJc(rec)
    }
    if(ch.cmd=='punch'){
      this.delDayPu(ch.wdprt)
    }
  }

  renderIoList =(data)=>{
    const perarr = createPeriodArray(data.inout)
    return (
    <div style={style.table.div} >
      <table style={style.table.table}><tbody>
        <tr style={style.table.tr}>
          <th style={style.table.thtd}>in</th>
          <th style={style.table.thtd}>out</th>
          <th style={style.table.thtd}>hrs</th>
        </tr>
        {perarr.map((per, i)=>{
          return(
          <tr key={i} style={style.table.tr}>
            <td style={style.table.thtd}>{per[0]}</td>
            <td style={style.table.thtd}>{per[1]}</td>
            <td style={style.table.thtd}>{per[2]}</td>
          </tr>
          )
        })
        }    
      </tbody></table>
    </div>
    )
  }
  render() { 
    const tin= 'tin'+this.props.data.idx
    const {data, jobs}=this.props
    const {hrs, jcost, jchrs, wdprt}=data
    const punch = this.setPunch()
    const inoutList = this.renderIoList(data)
    const now = moment().format("HH:mm")
    return ( 
      <div style={style.tcardDiv}>
        <div style={style.daydate.container}>
          <span style={style.daydate.day}> {moment(data.wdprt).format('ddd')} </span>
          <br/>
          <span>  {moment(data.wdprt).format('MM/DD/YY')}</span>
        </div>
        <div style={style.hrs.div}>
          <span style={style.hrs.span}>{hrs}</span>
        </div>
        <div style={style.punchclock.container}>
          <button style={style.punchclock.button} onClick={this.ifNotMobileAppend}>punch {punch}</button><br/>
          <input style={style.punchclock.input} id={tin} type="time" defaultValue={now} onChange={this.ifMobileAppend}/><br/>
        </div>
        {inoutList}
        <JobCost jcost={jcost} jchrs={jchrs} puhrs={hrs} jobs={jobs} wdprt={wdprt} jcChanges={this.handleJcChanges}/>
      </div>
     );
  }
}

export{Day}

const style={
  tcardDiv:{
    overflow:'hidden',
    border: '2px solid black',
    background: 'white'
  },
  punchclock:{
    container:{
      border: '2px green solid',
      boxShadow: '2px 2px green',
      borderRadius: '12px',
      float: 'left',
      background: 'white'
    },
    input:{
      margin: '6px 0 0 0',
      borderRadius: '0px 0px 12px 12px',
      backgroundImage: 'linear-gradient(-90deg, silver, white, silver)'
    },
    button:{
      margin: '0 0 6px 0',
      borderRadius: '12px 12px 5px 5px',
      width: '100px',
      background: 'white',
      backgroundImage: 'linear-gradient(-90deg, grey, silver)'
    }
  },
  daydate:{
    container:{
      float:'left',
      width:'70px',
      background: 'silver'
    },
    day:{
      fontSize: '25px'
    }
  },
  hrs:{
    div:{
      float: 'right',
      width: '80px',
      fontSize: '18px',
      textAlign: 'right',
      fontWeight: 'bold'
    },
    span:{

    }
  },
  table:{
    div:{
      float:'right',
      background: 'white',
      width: '130px'
    },
    table:{
      borderCollapse: 'collapse',
      width: '100%'
    },
    tr:{
      padding: '0px',
      margin: '0px'
    },
    thtd:{
      padding: '0px',
      margin: '0px'
    }
  }
} 

const io2hrs = (pin, pout)=>{
  const ti = moment.duration(moment(pout, "HH:mm").diff(moment(pin, "HH:mm")));
  const hrs = (ti._data.hours + ti._data.minutes/60).toFixed(2);  
  return hrs
}

const drnd=(n)=>{
  return Math.round(n*100)/100
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
  return drnd(thrs) 
}