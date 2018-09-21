import React from 'react'// eslint-disable-line no-unused-vars
import {parseQuery} from '../utilities/wfuncs'
import {ls, cfg} from '../utilities/getCfg'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchCoids, fetchCtoken} from '../../../../common/v0/src/services/fetches'

class Registered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cos: [], token:''  }
  }
  componentDidMount() {
    const query= this.props.cambio.page.params.query;
    var mobj = parseQuery(query)
    console.log('mobj: ', mobj) 
    fetchCoids(mobj)
    .then((res)=>{
      console.log('res: ', res)
      if(res.coid &&  res.coid.length==1){
        this.getCtoken(mobj.token,res.coid[0])
      }
      this.setState({cos:res.coid, token:mobj.token})
    })   
  }

  clickCoid=(e)=>{
    const idx =e.target.getAttribute('idx')
    const coid = this.state.cos[idx]
    this.getCtoken(this.state.token,coid)
  }

  getCtoken=(token,coid)=>{
    console.log('this.props.ejob.task: ', this.props.ejob.task)
    fetchCtoken(token,coid)
      .then((res)=>{
        console.log('res: ', res)
        ls.setItem({email: res.binfo.emailid, token:res.token})
        location.replace('#jobs')
      })
  }  

  render() {
    const{cos}=this.state 
    console.log('cos: ', cos)
    return (
      <div >
        <h4>You Be Registered  </h4>
        <a  href={cfg.url.authqry}>hi</a>
        {JSON.stringify(cos)}
        <ul>
          {cos.map((coid,i)=>(
            <li key={i} idx={i} onClick={this.clickCoid}>{coid} </li>
          ))}
        </ul>
      </div>      
      );
  }
}

Registered =  mapClass2Element(Registered)
 
export {Registered }

/*
function Registered(props){
  const onSuccess = () =>{
    location.replace('#jobs')
  }
  var em ='NOT'
  var regstr = 'dog'
  const query= props.cambio.page.params.query;
  var mobj = parseQuery(query)
  console.log('mobj: ', mobj)
  
  if (mobj!=undefined) {
    if(Object.keys(mobj).find((x)=>x=='message')){
      console.log('ie message');
      regstr=decodeURI(mobj.message)
    }else{
      fetchCoids(mobj)
        .then((res)=>{
          console.log('res: ', res)
        })
      if(mobj.email){
        console.log('hay mobj')
        em = mobj.email
      }else {
        em = ls.getKey('email')
        if(!em){
          em = '--no not really'
        }
      }
      regstr ='want to register as somebody else'
      ls.setItem(mobj)
      onSuccess()
    }
  }else{
    regstr = 'so register already'
  }
  return(
    <div style={style.outer} >
      <h4>You Be Registered {em} </h4>
      <a style={mStyle.a} href={cfg.url.authqry}>{regstr}</a>
      <span></span>
    </div>
    )
}

*/
