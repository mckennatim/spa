import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls} from '../utilities/getCfg'
import {Zone} from './Zone' // eslint-disable-line no-unused-vars
import {qOnMount, qdataAsArray, hookupMqtt} from '../services/interface'
import {mapClass2Element} from '../hoc'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class Zones extends React.Component{
  constructor (props){
    super(props);
    this.sr= this.props.cambio.page.params.sr
    this.loc= this.props.cambio.page.params.loc
  }

  componentDidMount(){
    this.unsub = hookupMqtt(this.loc, ls, (state)=>this.setState(state))
    qOnMount()
  }
  componentWillUnmount(){
    this.unsub.unsubscribe()
  }  
  render(){
    if (this.state) {
      let qdataArr=qdataAsArray(this.state.qdata)
      const displayZ=qdataArr.map((z)=>{
        return(
          <Zone key={z.id} zdsc={z} loc={this.loc}/>
        )
      })    
      return(
        <div style={style.outer} >
          <h4>in Zones for {this.loc} </h4>
          {displayZ}

        </div>
      )
    }else{
      return(
        <div style={style.outer} >
          <h4>in Zones for {this.loc}</h4>
          <button>better call saul</button>
        </div>
      )
    }
  }
}

Zones=mapClass2Element(Zones)

export {Zones}
