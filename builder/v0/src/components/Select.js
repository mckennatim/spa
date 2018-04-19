import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {mapClass2Element} from '../hoc'
import {router} from '../app'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class Select extends React.Component{
  constructor (props){
    super(props);
    this.state={devs:[]}
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
            console.log(JSON.stringify(json))
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
    this.setState({value: e.target.value});
  }

  goEdit=()=>{
    console.log('editin')
    router.navigate(`edit/${this.state.value}`)
  }

  render(){
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
      <br/>{this.state.qmessage}
      </div> 
      </div>
    )
  }
}

Select=mapClass2Element(Select)

export {Select}
