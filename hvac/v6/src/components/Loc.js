
import React from 'react'// eslint-disable-line no-unused-vars
import {cfg, ls} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'
import {pStyle, mStyle} from '../styles'
import {Zones} from './Zones' // eslint-disable-line no-unused-vars

const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class Loc extends React.Component{
  constructor(props) {
    super(props);
    this.zoneso=[]
    this.zedat=[]
  }
  render(){
    const { name } = this.props.test;
    const {params} =this.props.cambio.page
    ls.modItem("cloc", params.loc)
    const {status, message} = this.props
    const maybeLoad=()=>{
      switch(true){
        case status=='error' && message=='not-registered':
          return (<a style={mStyle.a} href={cfg.url.authqry}>please register again</a>)
        case status=='error':
          return (<p>{message}</p>)
        case status=='success'&& message=='no-records':
          return (<p>You are not registered at any Location</p>)
        case status=='success':
          const {devs, zones} =this.props.data[0]
          this.devso = JSON.parse(devs)
          this.zoneso = JSON.parse(zones)
          ls.modItem("devs", this.devso)
          ls.modItem("zones", this.zoneso)
          if(params.sr){
            return(<Zones devs={this.devso} zones={this.zoneso.filter((z)=>z.id==params.sr)} {...this.props.cambio}/>)
          }else{
            return(<Zones devs={this.devso} zones={this.zoneso} {...this.props.cambio}/>)
          }
        default:
          return (<p>{message}</p>)
      }
    };
    const ml = maybeLoad()
    ls.modItem("cloc", params.loc)
    return(
      <div style={style.outer} >
        <h4>in Loc {name} {params.loc} {params.sr} </h4>
        {ml}
        
      </div>
      )
  }
}
const fconfig = {
  url: cfg.url.api+'/dedata/loc',
  urlparams: ['cloc'],
  options: {headers: {'Authorization': 'Bearer '}},
}

Loc = mapClass2Element(fetchFor(Loc, fconfig))
export {Loc}

