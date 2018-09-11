import React from 'react';
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchSubmitted, fetchWhoTcard} from '../services/fetches'

class Payroll extends React.Component {
  constructor(props){
    super(props)
  }
  state = {submitted:[]  }

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
    console.log('idx: ', this.state.submitted[idx])
    fetchWhoTcard(this.state.submitted[idx])
    .then((res)=>{
      if (res.message){
        window.alert(res.message)
      }else{
        this.setState({tcard:res})
      }
    })
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
  render() {
    console.log('this.props: ', this.props) 
    console.log('this.state: ', this.state)
    const{submitted }=this.state
    const submrend = this.renderSubmitted(submitted)
    return ( 
      <div >
        <div style={style.he}>
          <div style={style.he.title}>payroll</div>
        </div>
        <div style={style.subm.div} >
          <span>outstanding submitted timecards</span>
          {submrend}
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