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
  handleDel=(i)=>{
    let msched = this.state.sched
    msched.splice(i,1)
    this.setState({sched: msched})
  }
  handleAdd=()=>{
    if(this.state.sched.length>4){
      window.alert('too many events, only supports up to 5')
    }else{
      let msched = this.state.sched
      let as = {time:"23:59", setpt:50}
      msched.push(as)
      this.setState({sched: msched})
    }
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
              <button onClick={this.handleDel.bind(this,i)}>-</button>   
                {s.time} {s.setpt}
              </span>
            </li>
            )
          })
        }
        </ul> 
        <button onClick={this.handleAdd}>+</button>     
        <button onClick={this.handleSave}>save</button>     
      </div>
    )
  }
}
export {SchedEdit}
