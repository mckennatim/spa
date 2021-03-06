import React from 'react'
import {cfg, ls} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'
import {makeMqtt} from '../actions/paho'
import {pStyle} from '../styles'
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

console.log(cfg);

class Loc extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      el3: {name: "mcmurry"},
      we: {name: "curtis"},
      otherwise: "dogshit"
    };
  }
  componentDidMount() {
    console.log('component did mount');
  }
  activateMqtt(data){
    console.log(data);
    ls.modItem("devs", data)
    const pq =makeMqtt(this.gotDataCB, this.gotMessageCB)
    pq.connect()
  }
  gotDataCB(thedata){
    let nmes=`[${thedata.destinationName}]${thedata.payloadString}`
    console.log(nmes)
  }

  gotMessageCB(message){
    console.log(message)
  }
  render(){
    const { name } = this.props.test;
    const {params} =this.props.responsive.page
    const {status, data, message} = this.props
    const listItems= data.map((item, i)=>{
      return(
        item+' '
      )
    })
    const maybeLoad=()=>{
      switch(true){
        case status=='error':
          return (<p>{message}</p>)
        case status=='success'&& message=='no-records':
          return (<p>You are not registered at any Location</p>)
        case status=='success':
          this.activateMqtt(data)
          return <p>{listItems}</p>
        default:
          return (<p>{message}</p>)
      }
    };
    const ml = maybeLoad()
    ls.modItem("cloc", params.loc)
    return(
      <div style={style.outer} ><h4>in dd doLoc {name} {params.loc}{ml}</h4>
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
