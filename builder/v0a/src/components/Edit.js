import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
// import {ls, cfg} from '../utilities/getCfg'
// import {geta} from '../utilities/wfuncs'
import {mapClass2Element} from '../hoc'


const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class Edit extends React.Component{
  constructor (props){
    super(props);
    //console.log(props)
    //this.state={devinfo:this.props.cambio.devinfo}
    // console.log(this.state)
  }

  componentDidMount(){
    //loadDevInfo()
  }

  componentWillUnmount(){
  }  

  changeDi = (e)=>{
    console.log('dogfood', e)

  }

  render(){
    // console.log(this.props)
    const {devinfo} = this.props
    const di = {...devinfo}
    di.specs =devinfo.specs
    return(

      <div style={style.outer} >
        <h4>in Edit</h4>
        {devinfo.id}<br/>
        {di.id}<br/>
        {devinfo.devid}<br/>
        {devinfo.description}<br/>
        {JSON.stringify(devinfo.specs)}<br/>
        <EdSpecs devinf={di} handleEdit={this.changeDi}/>
        {devinfo.qmessage}
      </div>
    )
  }
}

Edit=mapClass2Element(Edit)

const EdSpecs=(props)=>{ // eslint-disable-line no-unused-vars
  //console.log(props)
  const{devinf}=props
  // console.log(devinf)
  // if(devinf.specs){
    const keys = Object.keys(devinf.specs)
    //console.log(keys)
  // }
  return(
    <div>editing specs<br/>
    <ul>
    {keys.map((k,i)=>{
      return (
        <li key={i}>
          {k} {devinf[{k}]}
          <button onClick={props.handleEdit.bind(null,k)}>edit</button>
      
        {/*
        {k}  
        }
        
        */}
        </li>
        )
    })}
    </ul>
    </div>
    )

}

export {Edit}
