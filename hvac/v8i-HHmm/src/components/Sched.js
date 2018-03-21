import React from 'react'// eslint-disable-line no-unused-vars
import {HHmm2ampm} from '../utilities/getCfg'

class Sched extends React.Component{
  constructor (props){
    super(props);
    this.state={sched: this.props.sched}
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
                {HHmm2ampm(s.time)} {s.setpt}
              </span>
            </li>
            )
          })
        }
        </ul> 
      </div>
    )
  }
}
export {Sched}
