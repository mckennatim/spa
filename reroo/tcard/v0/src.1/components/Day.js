import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');

class Day extends React.Component {// eslint-disable-line no-unused-vars
  state = {punch:'in',inout:[], ros:[[]], th:0}
  tin = null
  
  componentDidMount(){
    const tin = 'tin'+this.props.akey
    this.tin = document.getElementById(tin)
  } 
  recTime=()=>{
    console.log(this.tin.value);
    let io = this.state.inout
    io.push(this.tin.value)
    if(io.length % 2 == 0 ){
      this.setState({punch:'in'})
    }else{
      this.setState({punch:'out'})
    }
    const ros = io.reduce((rows, key, i)=>(i % 2 == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [] )
    console.log(io);
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
        let ro = {}
        //const wkey =this.props.da.format("YYYY-[W]WW-E")
        ro[this.props.da]={hrs:hh.toFixed(2)}
        console.log(ro);
        this.props.sendData(ro)
        return hh
      }else{
        return tot
      }
    }, 0)
    console.log(thr);
    this.setState({inout:io, ros:ros, th:thr})
  }
  render() { 
    console.log(this.props);
    const {da, akey}=this.props
    const tin = 'tin'+akey
    //const {inout} = this.state;
    //const lio = this.listIo()
    return ( 
      <div >
        <span >{moment(da).format('ddd MM/DD/YY E')}</span><br/>
        <button onClick={this.recTime}>{this.state.punch}</button>
        <input id={tin} type="time" /><br/>
        {this.state.ros.map((r,i)=>(
          <div key={i}>
            <span>{r[0]} -->  {r[1]}   =  {r[2]} hrs</span>
          </div>
        ))} 
        {this.state.th.toFixed(2)}
        
      </div>
     );
  }
}

export{Day}