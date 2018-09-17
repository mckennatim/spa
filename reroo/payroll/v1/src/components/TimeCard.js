import React from 'react'// eslint-disable-line no-unused-vars
// var moment = require('moment');
import {Day} from './Day'// eslint-disable-line no-unused-vars
// import {putTcardWk} from '../services/fetches'
import {mapClass2Element} from '../hoc/mapClass2Element'

//import { stat } from 'fs';
// import {pStyle} from '../styles'

class TimeCard extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){

  }   
  setStatBkg=()=>{
    let sta ={...style.he.st.txtsp}
    if(this.props.tcard.showsub || 
      (this.props.tcard.wstat &&(this.props.tcard.wstat.status=='submitted' 
      || this.props.tcard.wstat.status=='approved' 
      || this.props.tcard.wstat.status=='paid'
      ))){
      sta.background ='#9eea9d'
    }
    return sta
  }

  handleDayChanges = (cmd, newdata)=>{
    this.props.tcardChanges(cmd,newdata)
    // if (cmd=='iopu'){
    //   this.props.tcardChanges(newdata)
    //   //this.checkStatus(newdata)
    // }
    // if (cmd=='punch'){
    //   console.log('punch this.state: ', this.state)
    //   console.log('punch this.props: ', this.props)
    //   const inout = newdata.inout.slice()
    //   const ndata= {...newdata}
    //   ndata.inout=inout
    //   const idx = ndata.idx
    //   const hrs = ndata.hrs
    //   let hrarr = this.props.tcard.hrs
    //   hrarr[idx]=hrs
    //   let wkarr = this.props.tcard.wkarr.slice()
    //   wkarr[idx]=ndata
    //   this.props.tcardChanges({wkarr, hrs:hrarr})
    //   this.setState({wkarr, hrs:hrarr})
    // }
    // if (cmd=='delpu'){
    //   let wkarr = this.props.tcard.wkarr.slice()
    //   const idx = wkarr.findIndex((d)=>d.wdprt==newdata.wdprt)
    //   const da = wkarr[idx]
    //   const nda ={...da}
    //   nda.hrs=0
    //   nda.inout =[]
    //   wkarr[idx]=nda
    //   let hrarr = this.props.tcard.hrs
    //   hrarr[idx]=0
    //   this.props.tcardChanges({wkarr, hrs:hrarr})
    //   this.setState({wkarr, hrs:hrarr})
    // }
    // if(cmd=='jcost'){
    //   const idx = newdata.idx
    //   const njcost = newdata.jcost.slice()
    //   const sumhrs = drnd(njcost.reduce((t,j)=>j.hrs+t, 0))
    //   let jchrarr = this.props.tcard.jchrs
    //   jchrarr[idx]=sumhrs
    //   let wkarr = this.props.tcard.wkarr.slice()
    //   wkarr[idx].jcost=njcost
    //   wkarr[idx].jchrs=sumhrs
    //   this.setState({wkarr, jchrs:jchrarr})
    // }
  }


  renderDays=()=>{
    const {week}=this.props;
    const {wkarr, jobs}=this.props.tcard;
    console.log('this.props: ', this.props)
    const rd = wkarr.map((d)=>{
      return(
        <Day key={d.idx} data={d} ismobile={this.props.ismobile} week={week} jobs={jobs} dayChanges={this.handleDayChanges}/>
      )
    })
    return rd
    // return (<h3>doggy</h3>)
  }

  render(){
    if(this.props.tcard){  
      const{week, tcard}=this.props
      const {wstat, hrs, emailid, showsub }=tcard;
      console.log('this.state: ', this.state)
      const status= wstat ? wstat.status : "unsaved" 
      const statstyle = this.setStatBkg()
      // unsaved, inprocess, ready, submitted, approved, paid
      const thrs=drnd(hrs.reduce((t,h)=>t+h,0))
      const renderedDays = this.renderDays()
      return(
      <div >
        <div style={style.he}>
          <div style={style.he.st}>
            <span style={statstyle}> {status} </span><br/>
            <span style={style.he.st.but}>
              {showsub && <button onClick={this.clSubmit}>submit</button> }
            </span>
          </div>
          <div style={style.inp}>
            <span>week {week} {emailid}
            </span>
          </div>
          <div style={style.thrs}>
            {drnd(thrs)}
          </div>
        </div>
        <div style={style.daydiv} >
          {renderedDays}
        </div>
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

export {TimeCard}

const drnd=(n)=>{
  return Math.round(n*100)/100
}

let style = {
  he:{
    height:'70px', 
    background:'silver',
    st:{
      float:'left',
      but: {
        width:'70px'
      },
      txtsp: {
        width:'70px',
        background: '#efe869',
      }
    }
  },
  inp:{
    margin:'auto',
    width: '33%'
  },
  thrs:{
    fontSize: '20px',
    float:'right'
  },
  daydiv:{
    overflow:'hidden',
    width:'100%'
  }
}