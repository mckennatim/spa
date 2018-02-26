import React from 'react'
import {mqttStore} from '../components/AtLoc'
import PropTypes from 'prop-types'

class ZonesMqtt extends React.Component{
  static propTypes = {
    render: PropTypes.func.isRequired
  }  
  constructor (props){
    super(props)
    this.goahead = true
  }
  componentDidMount(){
    let infocus = this.props.cambio.infocus
    console.log('infocus: ', infocus)
    mqttStore
      .do((qstate)=>console.log(qstate))
      .subscribe((qstate)=>{
        if (this.goahead){
          this.setState(qstate)
        }
      })
  }
  componentWillUnmount(){
    this.goahead=false
  }
  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    )
  }
}

export{ZonesMqtt}