import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls} from '../utilities/getCfg'
import {maybeConnect} from '../services/interface'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

function SensorRelay(props){
  const {cambio} = props
  maybeConnect(props.cambio.infocus)
  // console.log('cambio: ',JSON.stringify(cambio))
  const devs = ls.getKey('devs')
  const zones = ls.getKey('zones')
  return(
    <div style={style.outer} >
      <h4>in SensorRelay </h4>
      <p>{JSON.stringify(cambio)}<br/>
        {JSON.stringify(devs)}<br/>
        {JSON.stringify(zones)}<br/>
      </p>
    </div>
    )
}

export {SensorRelay}
