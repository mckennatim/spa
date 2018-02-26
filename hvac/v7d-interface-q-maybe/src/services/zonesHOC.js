import React from 'react'
import {mqttStore} from '../components/AtLoc'

let zonesHOC=(Comp, cfg)=>{
  console.log(cfg)
  return class zz extends React.Component {
    constructor (props){
      super(props);
      // console.log('this.props: ',JSON.stringify(this.props))
      //this.state= {devs:{}, zones:[]}
      this.goahead = true
    }
    componentDidMount(){
      let infocus = this.props.cambio.infocus
      console.log('infocus: ', infocus)
      mqttStore
        .do((state)=>console.log(state))
        .subscribe((state)=>{
          if (this.goahead){
            this.setState(state)
          }
        })
    }
    componentWillUnmount(){
      this.goahead=false
    }
    render() {
      return (
        <Comp {...this.props} {...this.state} />
      )
    }
  }
}

export{zonesHOC}