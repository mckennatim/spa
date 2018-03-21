import React from 'react'// eslint-disable-line no-unused-vars
import {ampm2HHmm} from '../utilities/getCfg'

class Sched extends React.Component{
  constructor (props){
    super(props);
    this.state={sched: this.props.sched}
  }
  
  handleSetptChange=(e)=>{
    let msched = this.state.sched
    msched[e.target.name].setpt = e.target.value*1
    this.setState({sched: msched})
  }
  handleTimeChange=(e)=>{
    let msched = this.state.sched
    msched[e.target.name].time = e.target.value
    this.setState({sched: msched})
  }

  handleSave=()=>{
    this.props.fromSched(this.state.sched)
  }

  render(){
    const {idx}=this.props
    return(
      <div>
        <ul>
        {this.state.sched.map((s,i)=>{
          let ieq = i==idx
          return(
            <li key={i}>
              <span style={ieq ? {color:'green'}:{color:'blue'}}>
              <input type="time"value={ampm2HHmm(s.time)}
                name={i}
                onChange={this.handleTimeChange}/> 
              <input type="number" style={{width: '3em'}} value={s.setpt}
                name={i}
                onChange={this.handleSetptChange}/>
                {s.time} {s.setpt}
              </span>
            </li>
            )
          })
        }
        </ul> 
        <button onClick={this.handleSave}>save</button>     
      </div>
    )
  }
}
export {Sched}
