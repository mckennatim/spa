import React from 'react' // eslint-disable-line no-unused-vars
import {pStyle} from '../styles'
import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'
import {mapClass2Element} from '../hoc'

const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#D54ac6'}
}

class Edit extends React.Component{
  constructor (props){
    super(props);
    this.state={qmessage:'dogs'}
  }

  componentDidMount(){
    this.fetchDevInfo()
  }

  componentWillUnmount(){
  }  

  fetchDevInfo=()=>{
    var lsh = ls.getItem();
    console.log(this.props)
    if(geta('lsh.token', lsh)){
      let url= cfg.url.api+'/admin/dev/'+this.props.cambio.page.params.dev
      console.log(url)
      let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          if(json.message){
            this.setState({qmessage: json.message})
          }else{
            let res = json[0]
            let specs= JSON.parse(res.specs)
            this.setState({id:res.id,devid:res.devid, description:res.description,specs:specs, qmessage:'' })
            console.log(this.state)
          }
        })
        .catch((e)=>{
          console.log(e.message)
          this.setState({qmessage: e.message})
        })
    }else{
      let mess = `can't fetch data, you aren't authorized, maybe re-register`
      this.setState({qmessage: mess})
    }
  }

  render(){
    return(
      <div style={style.outer} >
        <h4>in Edit</h4>
        {this.state.qmessage}
      </div>
    )
  }
}

Edit=mapClass2Element(Edit)

export {Edit}
