import React from 'react'// eslint-disable-line no-unused-vars
import {HHmm2ampm} from '../utilities/getCfg'

class Sched extends React.Component{
  constructor (props){
    super(props);
  }
  
  render(){
    // console.log('this.props.sched: ',JSON.stringify(this.props.sched))
    const {idx}=this.props
    return(
      <div>
        <ul>
        {this.props.sched.map((s,i)=>{
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
