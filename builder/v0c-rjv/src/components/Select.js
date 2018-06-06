import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {mapClass2Element} from '../hoc'
// import {router} from '../app'
import {Edit} from './Edit'// eslint-disable-line no-unused-vars
import {fetchDevInfo} from '../services/fetches'
import ReactJson from 'react-json-view'// eslint-disable-line no-unused-vars

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

const vstyle = {
    outer: { 
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

class Select extends React.Component{
  constructor (props){
    super(props);
    let page = this.props.cambio.page
    let dev = 'DEVICES'
    if (page.name=='Edit'){
      dev=page.params.dev
    }
    this.state={devs:[], value:dev, amediting:false, 
      devinfo: {description:'no data', qmessage: 'awaiting data', specs:{}, srarr:[], specKeys:[], specBeingEdited:[], srBeingEdited:[]}
    }
  }

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

  componentDidMount(){
    this.fetchDevids()
  }

  componentWillUnmount(){
  }  

  fetchDevids=()=>{
    var lsh = ls.getItem();
    // console.log(lsh)
    if(geta('lsh.token', lsh)){
      let url= cfg.url.api+'/admin/b/devlist/'
      let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          if(json.message){
            this.setState({qmessage: json.message})
          }else{
            // console.log(JSON.stringify(json))
            this.setState({devs:json})
          }
        })   
    }else{
      let mess = `can't fetch data, you aren't authorized, maybe re-register`
      this.setState({qmessage: mess})
    }
  }

  handleChange =(e)=>{
    console.log('handling change',e.target.value)
    //this.setState({value: e.target.value});
    //router.navigate(`edit/${e.target.value}`)
    fetchDevInfo(e.target.value)
      .then((devinfo)=>{
        console.log(devinfo)
        this.setState({devinfo:devinfo, value:devinfo.devid},()=>{
          // console.log('hello', this.state)
        })
        
      })
  }

  goSave=()=>{
    console.log('savein')
    //router.navigate(`edit/${this.state.value}`)
  }
  changeDevinfo =(m)=>{
    console.log(m)
  }

  render(){
    console.log('rerendering')
    // console.log(this.state)
    const{devinfo}=this.state
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
     
        <h4>in Select</h4>
        <div>
        <select value={this.state.value} onChange={this.handleChange}>
          {this.state.devs.map((d,i)=>{
            return(
                <option key={i}value={d}>{d}</option>
              )
          })}
        </select> 
        <button>+</button><button onClick={this.goSave}>save</button>
        </div>
        <div style={vstyle.outer}>
          <ReactJson src={devinfo}
            style={vstyle.rjv}
            displayDataTypes={displayDataTypes}
            indentWidth={indentWidth}
            onEdit={onEdit ? e => {
              console.log(e.updated_src)
              this.setState({ devinfo: e.updated_src })
            }: false} 
            onDelete={onDelete ? e => {
              console.log(e.updated_src)
              this.setState({ devinfo: e.updated_src })
            }: false} 
            onAdd={onAdd ? e => {
              console.log(e.updated_src)
              this.setState({ devinfo: e.updated_src })
            }: false} 
          />         
        </div> 
      </div>
    )
  }
}

Select=mapClass2Element(Select)

export {Select}
