import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');

class Day extends React.Component {// eslint-disable-line no-unused-vars
  state = {punch:'in',inout:[], ros:[[]], thrs:0, ioperiods:[]}
  tin = null
  
  componentDidMount(){
    //console.log('Day component ' +this.props.da+ ' mounting: ')
    const tin = 'tin'+this.props.akey
    this.tin = document.getElementById(tin)
    this.setState({inout: this.props.data.inout},()=>{
      this.setPunch()
      // this.createIoList()
    })
  } 

  setPunch =()=>{
    if(this.props.data.inout.length % 2 == 0 ){
      this.setState({punch:'in'})
    }else{
      this.setState({punch:'out'})
    }
  }

  appendTime=()=>{
    //.let io = this.state.inout
    let data = this.props.data
    data.inout.push(this.tin.value)
    //io.push(this.tin.value)
    //this.setPunch()
    // this.setState({inout: io},()=>{
    //   // this.createIoList()
    //   console.log('data: ', data)
    //   this.props.sendData(data, this.props.idx)
    // })
    console.log('data: ', data)
    this.props.sendData(data, this.props.idx)
  }



  // createIoList = ()=>{
  //   let pin, pout, phrs, thrs=0, ioperiods=[], ioper=[]
  //   this.state.inout.map((io,i)=>{
  //     if(i % 2 == 1){
  //       pout = io
  //       phrs = io2hrs(pin,pout)
  //       thrs += phrs*1
  //       ioper.push(pout)
  //       ioper.push(phrs*1)
  //       ioperiods.splice(-1,1)
  //       ioperiods.push(ioper)
  //     }
  //     if(i % 2 == 0){
  //       pin = io
  //       ioper = [pin]
  //       ioperiods.push(ioper)
  //     }
  //   })
  //   this.setState({thrs:thrs, ioperiods:ioperiods})
  // }

  renderIoList =()=>{
    const rl = this.props.ioperiods.map((per,i)=>(<div key={i}>{per[0]} -> {per[1]}  = {per[2]}</div>))
    return rl
  }


  render() { 
    const {da, akey, week, data}=this.props
    const {hrs, punchclock}=data
    const tin = 'tin'+akey
    //console.log('Day data: ', data)
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
        let ro = {wdprt: this.props.da, hrs:hh.toFixed(2), io:this.state.inout}
        console.log(ro);
        //this.props.sendData(ro)
        return hh
      }else{
        return tot
      }
    }, 0)
    console.log(thr);
    this.setState({inout:io, ros:ros, th:thr})
  }
}

export{Day}

// const io2hrs = (pin, pout)=>{
//   const ti = moment.duration(moment(pout, "HH:mm").diff(moment(pin, "HH:mm")));
//   const hrs = (ti._data.hours + ti._data.minutes/60).toFixed(2);  
//   return hrs
// }