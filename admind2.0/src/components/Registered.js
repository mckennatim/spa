import React from 'react'
import ReactDOM from 'react-dom'
import {pStyle} from '../styles'
import {getApps} from '../actions'
import {parseQuery} from '../utilities'
import {getCfg, ls} from '../utilities/getCfg'

const cfg = getCfg()


const style = {
	...pStyle, outer: {...pStyle.outer, background: '#FF9966'}
}
pStyle.outer.background='#C4A265'

function Registered(props){
  var em ='NOT'
  var regstr = 'dog'
  const query= props.responsive.page.params.query;
  var mobj = parseQuery(query)
  console.log(mobj)
  if (mobj!=undefined) {
    if(Object.keys(mobj).find((x)=>x=='message')){
      console.log('ie message');
      regstr=decodeURI(mobj.message)
    }else{
      em = mobj.email
      ls.addToSet(mobj)
    }
  }else{
    regstr = 'so register already'
  }  
  
  console.log('RUNNING Registered')
  

  const handleGetApps=()=>{
  	console.log('handling get apps')
    // ls.deleteToken('tim2@sitebuilt.net')
    // console.log(ls.getItem())
  	getApps(mobj)
  }

  return(
    <div style={style.outer} >
    	<h4>You Be Registered {em} </h4>
      {regstr}
    	<button onClick={handleGetApps}>get your apps and devices</button>
      <span></span>
    </div>
    )
}

export {Registered}
