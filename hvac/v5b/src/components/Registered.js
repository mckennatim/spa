import React from 'react'
import ReactDOM from 'react-dom'
import {pStyle} from '../styles'
import {getApps} from '../actions'
import {parseQuery} from '../utilities'
import {cfg, ls} from '../utilities/getCfg'

const style = {
	...pStyle, outer: {...pStyle.outer, background: '#FF9966'}
}
pStyle.outer.background='#C4A265'

function Registered(props){
  //console.log('in Registe5red')
  // console.log(props)
	var em ="not"
  const query= props.responsive.page.params.query;
  var mobj = parseQuery(query)
	if (mobj) {
		em = mobj.email;
		ls.addToSet(mobj);
	}
  console.log('RUNNING Registered')
	console.log(location);
	location.replace(cfg.cbPath)

  const handleGetApps=()=>{
  	console.log('handling get apps')
    // ls.deleteToken('tim2@sitebuilt.net')
    // console.log(ls.getItem())
  	getApps(mobj)
  }

  return(
    <div style={style.outer} >
    	<h4>You Be Registered {em} </h4>
    	<button onClick={handleGetApps}>get your apps and devices</button>
      <span></span>
    </div>
    )
}

export {Registered}
