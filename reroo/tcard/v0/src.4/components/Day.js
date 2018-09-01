import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');

const style={
  tcardDiv:{
    border: '2px solid black'
  }
} 

class Day extends React.Component {// eslint-disable-line no-unused-vars
  state={punch:'in'}
  
  componentDidMount(){
    const tin = 'tin'+this.props.data.idx
    this.tin = document.getElementById(tin)
    this.setPunch()
  } 

  setPunch =()=>{
    if(this.props.data.inout.length % 2 == 0 ){
      this.setState({punch:'in'})
    }else{
      this.setState({punch:'out'})
    }
  }

  appendTime=()=>{
    const newdata = {...this.props.data}
    newdata.inout.push(this.tin.value)
    this.props.dayChanges(newdata)
  }

  renderIoList =(data)=>{
    const rl = data.inout
    return rl
  }

  render() { 
    const {week, data}=this.props
    const {punch}=this.state
    const inoutList = this.renderIoList(data)
    return ( 
      <div style={style.tcardDiv}>
        <span >{week} {moment(data.wdprt).format('ddd MM/DD/YY E')}</span><br/>
        <button onClick={this.appendTime}>{punch}</button>
        <input id={this.tin} type="time" /><br/>
        {inoutList}
      </div>
     );
  }


}

export{Day}

// const io2hrs = (pin, pout)=>{
//   const ti = moment.duration(moment(pout, "HH:mm").diff(moment(pin, "HH:mm")));
//   const hrs = (ti._data.hours + ti._data.minutes/60).toFixed(2);  
//   return hrs
// }