import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {senrelHOC} from '../hoc/senrelHOC'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

let SenRel=(props)=>{
  const{azone, azdat, xmitChange, hoc} = props
  const handleChange = (e)=>{
    xmitChange(e.target)
  }
  return(
    <div style={style.outer} >
    <span>{azone.name} </span>
    <span>temp: {azdat[0].temp} </span>
    <span>relay: {azdat[0].relay} </span>
    <span>setPt: {azdat[0].setPt} </span>
    <span>timestamp: {JSON.stringify(azdat[0].ts)} </span>
    <button>modify</button>
    <span>sched: {JSON.stringify(azdat[0].sched)} </span>
    <input id="bo-rng" name="bohrs" type="range" min="0" max="8" step=".25"
      onChange={handleChange}/>
    <span>for {hoc.bohrs} hrs</span>  
    <button>boost to 68</button>
    until <input id="ho-dt" name="hodt" type="date"/><input type="time"/>
    <button>hold</button>
    </div>
    )
}

const cfg = {}
SenRel = senrelHOC(SenRel, cfg)

export {SenRel}
