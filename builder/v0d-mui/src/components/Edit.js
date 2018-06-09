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
    console.log(props)
    //this.state={this}
    // this.keys = Object.keys(props.devinfo.specs)
    // this.beingEdited=this.keys.map(()=>0)     
  }

  componentDidMount(){
    //loadDevInfo()
  }

  componentWillUnmount(){
  }  

  changeSpec = (data, idx)=>{
    console.log('in change spec')
    this.beingEdited[idx]=1
    console.log('dog', data, idx, this.beingEdited)
    //this.props.handleChange({section:'spec', data:data, idx:idx})
  }


  render(){
    // console.log(this.props)
    const {devinfo} = this.props
    const di = {...devinfo}
    const specs = di.specs
    console.log(specs)
    console.log(devinfo)
    this.keys = Object.keys(specs)
    this.beingEdited=this.keys.map(()=>0) 
    console.log(this.beingEdited)     
    return(

      <div style={style.outer} >
        <h4>in Edit</h4>
        {devinfo.id}<br/>
        {di.id}<br/>
        {devinfo.devid}<br/>
        {devinfo.description}<br/>
        {devinfo.owner}<br/>
        {JSON.stringify(devinfo.specs)}<br/>
        <EdSpecs specs={specs} beingEdited={this.beingEdited} specKeys={this.props.specKeys} handleEdit={this.changeSpec} />
        {devinfo.qmessage}
      </div>
    )
  }
}


const EdSpecs=(props)=>{ // eslint-disable-line no-unused-vars
  
  const{specs}=props
  console.log(specs)
  console.log(props)
  // if(specs.specs){
  const keys = Object.keys(specs)
  // console.log(keys)
  // let beingEdited=keys.map(()=>0)  
  //console.log(keys)
  // }
  //console.log(props.beingEdited)
  const edit=(k,i)=>{
    //beingEdited[i]=1
    console.log(k, i)
  }
  return(
    <div>editing specs<br/>
    <ul>
    {keys.map((k,i)=>{
      return (
        <li key={i}>
          {props.beingEdited[i] ? (
              <span>being edited {props.beingEdited[i]}--</span>
            ) : (
              <span>not beingEdited {props.beingEdited[i]}--</span>
            )}
          {k} {specs[k]}
          <button onClick={props.handleEdit.bind(null,k,i)}><i className="material-icons"style={{fontSize:16}}>edit</i> </button>
          <i className="material-icons" style={{fontSize:16}} onClick={edit.bind(null,k,i)}>save</i>
          <i className="material-icons" >edit</i>
          <i className="material-icons" >save</i>
          <i className="material-icons" >add</i>
          <i className="material-icons" >delete</i>
        {/**/}
        </li>
        )
    })}
    </ul>
    </div>
    )
}

Edit=mapClass2Element(Edit)

export {Edit}
