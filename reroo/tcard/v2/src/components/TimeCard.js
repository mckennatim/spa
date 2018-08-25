import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {ls} from '../utilities/getCfg'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class TimeCard extends React.Component{
  active='mabibi'
  state = {week:moment().week(), emailId:ls.getKey('email'), wkhrs:0, tdata:{days:[]}}
  yr= moment().format('YYYY')
  componentDidMount(){
    this.getTimeCard()
  }  
  getTimeCard(){
    console.log('doggy');
  }
  chwk=(e)=>{
    this.setState({week:e.target.value})
  }
  updat=()=>{
    const aday = `${this.yr}-W${this.state.week.toString().padStart(2,'0')}-1`
    let da=[]
    da.push(moment(aday).subtract(3, 'days'))
    da.push(aday)
    da.push(moment(aday).add(1, 'days'))
    da.push(moment(aday).add(2, 'days'))
    da.push(moment(aday).add(3, 'days'))
    return da
  }

  recData =(d)=>{
    const dkey =Object.keys(d)[0]
    console.log(this.state.tdata);
    let ntd = {...this.state.tdata}
    console.log(ntd);
    let days = ntd.days
    let found=false
    let ndays = days.map((day)=>{
      if(Object.keys(day)[0]==dkey){
        found=true
        day[dkey]=d[dkey]
      }
      return day
    })
    if(!found){
      ndays.push(d)
    }
    ntd.days=ndays
    console.log(ntd);
    let btd = {days:[{wk: {hrs:23}}]}
    console.log(btd);
    this.setState({tdata: ntd}, ()=>console.log(this.state.tdata))
  }

  sumData = ()=>{

  }
  render(){
    const aday=this.updat()
    const {emailId, week}=this.state;
    if(emailId){
      
      return(
        <div style={style.outer}>
          <h4> TimeCard for {emailId}</h4>
          <span><input type="number" value={week} onChange={this.chwk} style={{width:'35px'}} /></span>
          {aday.map((da,i)=>
            <div key={i}>          
              <Day key={i} akey={i} da={da} sendData={this.recData}/>
            </div>
          )}
        </div>
      )
    }else{
    return(
        <div>yeah you dont seem to be logged in here, try register</div>
      )
    }
  }
}

TimeCard = mapClass2Element(TimeCard)

//------------class Day--------------------------------------------

class Day extends React.Component {// eslint-disable-line no-unused-vars
  state = {punch:'in',inout:[], ros:[[]], th:0}
  tin = null
  
  componentDidMount(){
    this.tin = document.getElementById("tin")
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
        const wkey =this.props.da.format("YYYY-[W]WW-E")
        ro[wkey]={hrs:hh.toFixed(2)}
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
    const {da}=this.props
    //const {inout} = this.state;
    //const lio = this.listIo()
    return ( 
      <div >
        <span >{moment(da).format('ddd MM/DD/YY E')}</span><br/>
        <button onClick={this.recTime}>{this.state.punch}</button>
        <input id="tin" type="time" /><br/>
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


export {TimeCard}
