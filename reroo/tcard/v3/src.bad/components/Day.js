import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');

class Day extends React.Component {// eslint-disable-line no-unused-vars
  state = {punch:'in',inout:[], ros:[[]], thrs:0, ioperiods:[]}
  tin = null
  
  componentDidMount(){
    const tin = 'tin'+this.props.akey
    this.tin = document.getElementById(tin)
    this.setState({inout: this.props.data.inout},()=>{
    })
  } 

  appendTime=()=>{
    let io = this.state.inout
    let data = this.props.data
    data.inout.push(this.tin.value)
    io.push(this.tin.value)
    this.setState({inout: io},()=>{
      this.props.sendData(data, this.props.idx)
    })
  }

  renderIoList =()=>{
    const rl = this.props.ioperiods.map((per,i)=>(<div key={i}>{per[0]} -> {per[1]}  = {per[2]}</div>))
    return rl
  }


  render() { 
    const {da, akey, week, data}=this.props
    const {hrs, punchclock}=data
    const tin = 'tin'+akey
    const inoutList = this.renderIoList()
    return ( 
      <div >
        <span >{week} {moment(da).format('ddd MM/DD/YY E')}</span><br/>
        <button onClick={this.appendTime}>{punchclock}</button>
        <input id={tin} type="time" /><br/>
        {inoutList}
        {hrs}
      </div>
     );
  }

  
  recTime=()=>{
    let io = this.state.inout
    io.push(this.tin.value)
    if(io.length % 2 == 0 ){
      this.setState({punch:'in'})
    }else{
      this.setState({punch:'out'})
    }
    const ros = io.reduce((rows, key, i)=>(i % 2 == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [] )
    const rosh = ros.map((rh)=>{
      if (rh.length==2){
        const ti = moment.duration(moment(rh[1], "HH:mm").diff(moment(rh[0], "HH:mm")));
        const hrs = (ti._data.hours + ti._data.minutes/60).toFixed(2);
        rh.push(hrs)
      }
      return rh
    })
    const thr = rosh.reduce((tot, key)=>{
      if(key.length==3){
        let hh = (tot + key[2]*1)
        return hh
      }else{
        return tot
      }
    }, 0)
    this.setState({inout:io, ros:ros, th:thr})
  }
}

export{Day}
