import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function TimerCtl(props){
  const propstr = JSON.stringify(props)
  return(
    <div style={style.outer} >
      <h4>in TimerCtl </h4>
      <p>{propstr}</p>
    </div>
    )
}

export {TimerCtl}
