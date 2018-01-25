import React from 'react'
import ReactDOM from 'react-dom'
import {pStyle} from '../styles'
import {parseQuery} from '../utilities'
import {cfg, ls} from '../utilities/getCfg'
import {mStyle} from '../styles'


const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#FF9966'}
}
pStyle.outer.background='#C4A265'

function Registered(props){
  const getLocs = () =>{
    location.replace('#loclist')
  }
  var em ='NOT'
  var regstr = 'dog'
  const query= props.responsive.page.params.query;
  var mobj = parseQuery(query)
  if (mobj!=undefined) {
    if(Object.keys(mobj).find((x)=>x=='message')){
      console.log('ie message');
      regstr=decodeURI(mobj.message)
    }else{
      em = mobj.email
      ls.setItem(mobj);
      getLocs()
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

export {Registered}
