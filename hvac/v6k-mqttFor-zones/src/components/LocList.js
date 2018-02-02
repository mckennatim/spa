import React from 'react'// eslint-disable-line no-unused-vars
import {cfg} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'

let LocList = (props)=>{
  const {status, data, message} = props
  const listItems= data.map((item, i)=>{
    let hash = '#at/'+item
    return(
      <li key={i}><a href={hash} data-navigo>{item}</a></li>
    )
  })
  const maybeLoad=()=>{
    let rval
    switch(true){
      case status=='error'&& message=='not-registered':
        console.log('in not registered')
        rval = (<a href={cfg.url.authqry}>please register again</a>)
        // rval = (<p>'in not registered' {message}</p>)
        break
      case status=='error':
        rval = (<p>{message}</p>)
        break
      case status=='success'&& message=='no-records':
        rval = (<p>You are not registered at any Location</p>)
        break
      case status=='success'&& message=='just-1':
        console.log('about to location repalce just-1')
        location.replace('#at/'+data[0])
        break
      case status=='success'&& message=='multi':
        rval = <ul>{listItems}</ul>
        break
      default:
        rval=  (<p>{message}</p>)
    }
    return rval
  };
  const ml = maybeLoad()
  return(
    <div >
      <h3> Location List </h3>
      {ml}
    </div>
  )
}

const fconfig = {
  url: cfg.url.api+'/dedata/loclist',
  urlparams: [],
  options: {headers: {'Authorization': 'Bearer '}},
}

LocList = mapClass2Element(fetchFor(LocList, fconfig))
export {LocList}
