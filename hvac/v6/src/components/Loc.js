
import React from 'react'// eslint-disable-line no-unused-vars
import {cfg, ls} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'
// import {makeMqtt} from '../actions/paho'
import {pStyle, mStyle} from '../styles'
import {Zones} from './Zones' // eslint-disable-line no-unused-vars
// import {processMessage} from '../utilities/mq'

const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class Loc extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mqda: {},
      el3: {name: "mcmurry"},
      we: {name: "curtis"},
      otherwise: "dogshit"
    };
  }
  activateMqtt(){
    console.log('in actMqtt')
    // this.pq =makeMqtt(this.gotDataCB, this.gotMessageCB)
    // this.pq.connect()
  }

  // gotDataCB(thedata){
  //   console.log(thedata)
  //   const modStateCB=(nstate)=>{
  //     if(nstate.message=='no zones or devs go back to locations'){
  //       console.log(nstate)
  //     }else{
  //       console.log(nstate)
  //     }
  //   }    
  //   //processMessage(thedata, modStateCB)
  // }
  // gotMessageCB(message){
  //   console.log(message)
  // }
  render(){
    const { name } = this.props.test;
    const {params} =this.props.responsive.page
    ls.modItem("cloc", params.loc)
    const {status, message} = this.props
    const {infocus} = this.props.responsive
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
          if(infocus){
            console.log('about to activsteMqtt')
            this.activateMqtt()
            return <p>zones duck</p>
          }else {
            if(this.pq){
              this.pq.disconnect()
            }
          }
          break
        default:
          return (<p>{message}</p>)
      }
    };
    const ml = maybeLoad()
    ls.modItem("cloc", params.loc)
    return(
      <div style={style.outer} >
        <h4>in Loc {name} {params.loc}</h4>
        {ml}
        <Zones devs={this.devso} zones={this.zoneso} {...this.state} {...this.props.responsive}/>
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

