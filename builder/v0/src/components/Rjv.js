import ReactJson from 'react-json-view'// eslint-disable-line no-unused-vars
import React from 'react'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc'
import {pStyle} from '../styles'

const style = {
 ...pStyle, outer: {...pStyle.outer, 
      background: 'white', 
      textAlign: 'left',
      MozTransform: 'scale(1.3)',
      zoom: '130%'
    },
    rjv: {
      fontFamily: 'Tahoma, Geneva, sans-serif',
      fontStretch: 'ultra-condensed'      
    }
}



class Rjv extends React.Component{

    defaults = {
        theme: "monokai",
        src: null,
        collapsed: false,
        collapseStringsAfter: 15,
        onAdd: true,
        onEdit: true,
        onDelete: true,
        displayObjectSize: true,
        enableClipboard: true,
        indentWidth: 2,
        displayDataTypes: false,
        iconStyle: "triangle"
      }

  spec ={
    "software_version": "2.0",
    "hardware_version": "wemos",
    "sr": [
    {
      "srid":0,
      "hayrelay":0,
      "haysensor":{
        "senses":"temp",
        "model":"DHT22"
      }
    },
    {
      "srid":1,
      "hayrelay":0,
      "haysensor":{
        "senses":"humid",
        "model":"DHT22"
      }
    },
    {
      "srid":2,
      "hayrelay":{
        "controlled":0,
        "defsched":[[0,0,1]]
      },
      "haysensor":0
    }
    ]
  }


  state={spec: this.spec}
// use the component in your app!
  render(){
    const{spec}=this.state
    const{
        theme,
        src,
        collapsed,
        collapseStringsAfter,
        onAdd,
        onEdit,
        onDelete,
        displayObjectSize,
        enableClipboard,
        indentWidth,
        displayDataTypes,
        iconStyle
      } = this.defaults
    return(
      <div style={style.outer} >
        <ReactJson src={spec}
          style={style.rjv}
          displayDataTypes={displayDataTypes}
          indentWidth={indentWidth}
          onEdit={onEdit ? e => {
            console.log(e.updated_src)
            this.setState({ spec: e.updated_src })
          }: false} 
          onDelete={onDelete ? e => {
            console.log(e.updated_src)
            this.setState({ spec: e.updated_src })
          }: false} 
          onAdd={onAdd ? e => {
            console.log(e.updated_src)
            this.setState({ spec: e.updated_src })
          }: false} 
        />
      </div>
      )
  }
}

Rjv=mapClass2Element(Rjv)

export{Rjv}
