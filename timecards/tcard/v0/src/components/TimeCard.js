import React from 'react'// eslint-disable-line no-unused-vars
import {Day} from './Day'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'

class TimeCard extends React.Component{
  state={selectedDay:9}

  constructor(props){
    super(props)
  }
  componentDidMount(){
    // console.log('this.props: ', this.props)
  }   
  setStatBkg=()=>{
    let sta ={...style.he.st.txtsp}
    if(this.props.tcard.showsub || 
      (this.props.tcard.wstat &&(this.props.tcard.wstat.status=='submitted' 
      || this.props.tcard.wstat.status=='approved' 
      || this.props.tcard.wstat.status=='paid'
      || this.props.tcard.wstat.status=='ready'
      ))){
      sta.background ='#9eea9d'
    }
    return sta
  }

  chwk=(e)=>{
    let wk =e.target.value
    console.log('e.target.value: ', e.target.value)
    //if(wk>0 && wk<=52){
      this.props.weekChanged(wk)
    //}
  }

  handleDayChanges = (cmd, newdata)=>{
    this.props.tcardChanges(cmd,newdata)
  }

  clickSubmit =()=>{
    this.props.tcardChanges('submit',{showsub: false,status:'submitted', blabel:this.props.blabel})
    //console.log('this.props.blabel: ', this.props.blabel)
  }

  handleClick=(idx)=>(tin)=>{
    console.log('in timecards')
    console.log('in tmecards', idx,tin)
    this.setState({selectedDay:idx})
  }

  renderDays=()=>{
    const {week}=this.props;
    const {wkarr, jobs}=this.props.tcard;
    console.log('wkarr: ', wkarr)
    const rd = wkarr.map((d)=>{
      const isselected=d.idx==this.state.selectedDay
      return(
        <Day key={d.idx} data={d} ismobile={this.props.ismobile} week={week} hayjobs={this.props.hayjobs} jobs={jobs} dayChanges={this.handleDayChanges} gotClicked={this.handleClick(d.idx)} isselected={isselected}/>
      )
    })
    return rd
  }

  render(){
    if(this.props.tcard){  
      const{week, showsub, blabel, tcard}=this.props
      const {wstat, hrs, emailid}=tcard;
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
              {showsub && <button onClick={this.clickSubmit}>{blabel}</button> }
            </span>
          </div>
          <div style={style.inp}>

            <span>week             
              <input type="tel" value={week} onChange={this.chwk} style={{width:"35px"}}/> {emailid}
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