import React from 'react'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import{fetchApps} from '../services/fetches'
import {ls, cfg, makeHref} from '../utilities/getCfg'

class UrApps extends React.Component{
  active='mabibi or buttler'
  componentDidMount(){
    this.setState({host:window.location.hostname})
    this.getApps()
  }  
  getApps(){
    fetchApps()
      .then((res)=>{
        const apps = res.map((r)=>r.appid)
        this.setState({apps:apps, emailid: res[0].emailid, coid:res[0].coid,role:res[0].role, goodtil:res[0].goodtil })
        console.log('res: ', res)
      })
  }

  render(){
    console.log('ls.getToken ? true : false: ', ls.getToken ? true : false)
    if(this.state && this.state.apps && ls.getToken()){
      const {apps, emailid, role, goodtil, coid, host}=this.state
      return(
        <div style={style.outer}>
          <h3> UrApps is {this.active}</h3>
          <span>id: {emailid}</span><br/>
          <span>co: {coid}</span><br/>
          <p>If you are associated with another company, click <a href={cfg.url.authqry}>register</a> to be able to sign into that company </p>
          <span>role: {role}</span><br/>
          <span>signed up until: {goodtil.split('T')[0]}</span><br/>
          {apps
            .filter((a)=>a!='signup')
            .map((a,i)=>{
            const href = makeHref(host,a)
            console.log('href: ', href)
            return(
              <div key={i}><a href={href}><span>{a}</span></a> <br/></div>
            )
          })}
        </div>
      )
    }else{
      return(
        <div style={style.outer}>
        <h4>Re-register please</h4>
          <p>There doesn't seeem to be a record of you on this device. Could your re-<a href={cfg.url.authqry}>register</a>  </p>
        </div>
      )
    }
  }
}
UrApps = mapClass2Element(UrApps)

export {UrApps}

const style = {
  outer:{
    overflow:'hidden',
    padding: '4px',
    margin: '2px 10px 10px 10px'
  }
}