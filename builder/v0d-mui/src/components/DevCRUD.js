import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {mapClass2Element} from '../hoc'
// import {router} from '../app'
import {Edit} from './Edit'// eslint-disable-line no-unused-vars
import {fetchDevInfo, getLastDev} from '../services/fetches'
import ReactJson from 'react-json-view'// eslint-disable-line no-unused-vars
import ReactMaterialSelect from 'react-material-select'// eslint-disable-line no-unused-vars
import '../styles/reactMaterialSelect.css'
import Button from 'muicss/lib/react/button';// eslint-disable-line no-unused-vars
import Option from 'muicss/lib/react/option';// eslint-disable-line no-unused-vars
import Select from 'muicss/lib/react/select';// eslint-disable-line no-unused-vars

const style = {
 ...pStyle, outer: {...pStyle.outer, 
                    background: '#c1b8b8'}
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
      fontStretch: 'ultra-condensed',
      padding: 60,
      margin: 60   
    },
    old:{
      padding: 60,
      margin: 60
    },
    button:{
      backgroundColor: '#7abbdb',
      border: 'none',
      color: 'white',
      padding: '5px 10px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '32px',
      margin: '4px 2px',
      cursor: 'pointer'
    }
}

class DevCRUD extends React.Component{
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
    this.binfo={baseDevid:"CU", bizid:''}
    this.bldev={devid:"", 
                specs:{
                  software_version:2.0, 
                  hardware_version: "wemos"
                }, 
                sr:[{
                      srid:0,
                      haysensor:{
                        senses:"humid/temp",
                        model:"DHT22/DS18B20"
                      },
                      hayrelay:{
                        controlled: 1,
                        defsched: [0,0,55,52]
                      }
                    },{
                      srid:1,
                      haysensor:0,
                      hayrelay:0
                    }
                  ]
              }
  }

  defaults = {
      onAdd: true,
      onEdit: true,
      onDelete: true,
      indentWidth: 2,
      displayDataTypes: false
    }  

  componentDidMount(){
    this.fetchDevids()
    console.log(this.state)
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

  handleSelect =(e)=>{
    console.log('handling select',e.target.value)
    fetchDevInfo(e.target.value)
      .then((results)=>{
        console.log(results)
        this.binfo = results.binfo
        console.log(this.binfo)
        this.setState({devinfo:results.devinfo, value:results.devinfo.devid},()=>{
          // console.log('hello', this.state)
        })
        
      })    
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

  addDev=()=>{
    console.log(this.binfo)
      getLastDev(this.binfo.baseDevId)
      .then((lastdev)=>{
        console.log(lastdev)
      })  
  }

  changeDevinfo =(m)=>{
    console.log(m)
  }

  render(){
    console.log('rerendering')
    console.log(this.state.devs)
    const{devinfo}=this.state
    const{
        onAdd,
        onEdit,
        onDelete,
        indentWidth,
        displayDataTypes,
      } = this.defaults    
    return(
      <div style={style.outer} >
      {/*
        <ReactMaterialSelect label="Choose device" onChange={this.handleSelect.bind(this)}>
          {this.state.devs.map((d,i)=>{
            return(
                <option key={i} dataValue={d}>{d}</option>
              )
          })}
        </ReactMaterialSelect> 
        */} 
        <form action="">
        <Select label='select2' onChange={this.handleSelect.bind(this)}>
          {
            this.state.devs.map(function (dev, i) {
              return <Option key={i} value={dev} label={dev} />;
            })
          }
        </Select> 
        <button style={vstyle.button} onClick={this.addDev.bind(this)}>+</button>
        <Button  color="accent" variant="raised" size="small" onClick={this.addDev.bind(this)}>+</Button>          
        </form>        
        <div style={vstyle.old}>

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

DevCRUD=mapClass2Element(DevCRUD)

export {DevCRUD}
