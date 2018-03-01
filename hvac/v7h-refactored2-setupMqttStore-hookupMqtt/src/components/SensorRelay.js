import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls} from '../utilities/getCfg'
import {qOnMount, hookupMqtt} from '../services/interface'
import {mapClass2Element} from '../hoc'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class SensorRelay extends React.Component{
  constructor (props){
    super(props);
    this.sr= this.props.cambio.page.params.sr
    this.loc= this.props.cambio.page.params.loc
  }

  componentDidMount(){
    hookupMqtt(this.loc, ls, (state)=>this.setState(state))
    qOnMount()
  }
  componentWillUnmount(){
 
  }  
  render(){
    if (this.state) {
      return(
        <div style={style.outer} >
          <h4>in SensorRelay for {this.loc} </h4>
          <p>
            {JSON.stringify(this.state.qdata[this.sr])}<br/>
            {JSON.stringify(this.props.cambio)}<br/>
          </p>
        </div>
      )
    }else{
      return(
        <div style={style.outer} >
          <h4>in SensorRelay for {this.loc}</h4>
          <button>better call saul</button>
        </div>
      )
    }
  }
}

SensorRelay=mapClass2Element(SensorRelay)

export {SensorRelay}
