import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {mapClass2Element} from '../hoc'
// import {router} from '../app'
import {Edit} from './Edit'// eslint-disable-line no-unused-vars
import {fetchDevInfo} from '../services/fetches'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
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
      devinfo: {description:'no data', qmessage: 'awaiting data', specs:{}, srarr:[]}
    }
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
      let url= cfg.url.api+'/admin/devlist/'
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
    // console.log('handling change',e.target.value)
    //this.setState({value: e.target.value});
    //router.navigate(`edit/${e.target.value}`)
    fetchDevInfo(e.target.value)
      .then((devinfo)=>{
        // console.log(devinfo)
        this.setState({devinfo:devinfo, value:devinfo.devid},()=>{
          // console.log('hello', this.state)
        })
        
      })
  }

  goEdit=()=>{
    console.log('editin')
    let devinfo = {...this.props.devinfo}
    this.setState({amediiting: true, devinfo:devinfo})
    //router.navigate(`edit/${this.state.value}`)
  }

  render(){
    console.log('rerendering')
    console.log(this.state)
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
        <button>+</button><button onClick={this.goEdit}>edit</button>
        </div> 
        <Edit  devinfo={this.state.devinfo}/>
      </div>
    )
  }
}

Select=mapClass2Element(Select)

export {Select}
