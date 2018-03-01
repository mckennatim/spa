import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls} from '../utilities/getCfg'
import {Zone} from './Zone' // eslint-disable-line no-unused-vars
import {getMqttStore, createMqttStore, qOnMount, qdataAsArray} from '../services/interface'
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
    console.log('Zones mounted')
    console.log(this.props.cambio)
    let haystore=false
    let mqttStore = getMqttStore()
    if(mqttStore){
      haystore=true
    } else if(ls.getKey("cloc")==this.props.cambio.page.params.loc && ls.getKey('devs') && ls.getKey('qdata')){
      console.log('can create a store frome here')  
      createMqttStore(ls.getKey('devs'), ls.getKey('qdata'))
      haystore=true
      mqttStore = getMqttStore()
    }
    if (haystore){
      mqttStore
        .subscribe((state)=>{
          this.setState(state)
        }
      )      
    }
    qOnMount()
  }
  componentWillUnmount(){

  }  
  render(){
    if (this.state) {
      let qdataArr=qdataAsArray(this.state.qdata)
      const displayZ=qdataArr.map((z)=>{
        return(
          <Zone key={z.id} zdsc={z} loc={this.props.cambio.page.params.loc}/>
        )
      })    
      return(
        <div style={style.outer} >
          <h4>in Zones for {this.loc} </h4>
          {displayZ}
          <p>
            {JSON.stringify(this.state.qdata)}<br/>
            {JSON.stringify(this.props.cambio)}<br/>
          </p>
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
