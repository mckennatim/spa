import React from 'react';
import {TimeCard} from './TimeCard'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchSubmitted, fetchWhoTcard} from '../services/fetches'

class Payroll extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    submitted:[],
    gottcard:false,
    week:55,
    yr:'1969' 
  }

  componentDidMount(){
    this.getSubmitted(this.state.week)
  }

  getSubmitted=()=>{
    fetchSubmitted()
      .then((res)=>{
        if (res.message){
          window.alert(res.message)
        }else{
          this.setState({submitted:res})
        }
      })
  }

  getWhosTcard=(e)=>{
    //getsAttribute of whatever is touched in li, not just li bank space
    const idx = e.target.getAttribute('ix')
    const wstat =this.state.submitted[idx]
    this.setState({week:wstat.wprt.slice(-2)*1, yr:wstat.wprt.slice(0,4)})
    fetchWhoTcard(wstat)
    .then((res)=>{
      if (res.message){
        window.alert(res.message)
      }else{
        this.setState({tcard:res, gottcard:true})
      }
    })
  }

  handleTcardChanges=(chobj)=>{
    console.log('chobj: ', chobj)
    console.log('this state.tcard: ', this.state.tcard)
    let tcard = {...this.state.tcard}
    let wkarr = tcard.wkarr.slice()
    let hrs =  tcard.hrs.slice()
    const idx = chobj.idx
    hrs[idx] = chobj.hrs
    console.log('hrs: ', hrs)
    wkarr[idx].hrs = chobj.hrs
    wkarr[idx].inout =chobj.inout
    tcard.wkarr = wkarr
    tcard.hrs = hrs
    console.log('tcard: ', tcard)
    this.setState({tcard})
  }

  renderSubmitted=(subm)=>{
    if(subm.length>0)
    return(
      <ul style={style.subm.ul}>
        {subm.map((s,i)=>{
          return(
            <li key={i} style={style.subm.li} ix={i} onClick={this.getWhosTcard}>
              <div ix={i} style={style.subm.li.id}>{s.wprt}: </div>
              <div ix={i} style={style.subm.li.id}>{s.emailid}</div>
              <div ix={i} style={style.subm.li.stat}>{s.status}</div>
            </li>
          )
        })}
      </ul>
    )
  } 
  
  renderTimecard = ()=>{
    if(this.state.gottcard){
      return (
        <TimeCard week={this.state.week} yr={this.state.yr} tcard={this.state.tcard} ismobile={this.props.responsive.ismobile} tcardChanges={this.handleTcardChanges}/>
      )
    }
  }
  
  render() {
    const{submitted }=this.state
    const submrend = this.renderSubmitted(submitted)
    const tcard = this.renderTimecard()
    return ( 
      <div >
        <div style={style.he}>
          <div style={style.he.title}>payroll</div>
        </div>
        <div style={style.subm.div} >
          <span>outstanding submitted timecards</span>
          {submrend}
        </div> 
        <div>
          {tcard}
        </div>
      </div>
    );
  }
}

Payroll=mapClass2Element(Payroll)
 
export {Payroll} ;

let style={
  he:{
    height:'60px',
    background:'grey',
    title:{
      float: 'right'
    }
  },
  subm:{
    div:{
      overflow:'hidden',
      background: 'silver'
    },
    ul:{
      width: '98%',
      padding: '5px',
      listStyle: 'none',
      float: 'left'
    },
    li:{
      overflow:'hidden',
      padding: '6px',
      border:'1px solid',
      id:{
        float: 'left'
      },
      stat: {
        float: 'right'
      }
    }
  }
}