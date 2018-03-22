import React from 'react'// eslint-disable-line no-unused-vars
// import {ampm2HHmm} from '../utilities/getCfg'

class SchedEdit extends React.Component{
  constructor (props){
    super(props);
    this.state={sched: this.props.sched}
  }

  componentWillMount(){
    this.resetState()
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
  resetState=()=>{
    this.setState({sched: this.props.sched})
  }

  render(){
    return(
      <div>
        <ul>
        {this.props.sched.map((s,i)=>{
          return(
            <li key={i}>
              <span >
              <input type="time"value={s.time}
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
export {SchedEdit}
