import React from 'react' // eslint-disable-line no-unused-vars
import {cfg} from '../utilities/getCfg'
import { setKeyVal } from '../actions/personacts';

console.log('cfg.url.authqry: ', cfg.url.authqry)

const Nav = () =>{

  const setU=()=>{
    setKeyVal({update:false, clearjc:true})
  }
  return (
    <div style={style} id="menu"> 
      <ul>
        <li style={style.li}><a style={style.a} href={cfg.url.authqry}>register</a></li>
        <li style={style.li}><a style={style.a} href="about" data-navigo>about</a></li>
        <li style={style.li}><a style={style.a} href="persons" data-navigo>persons</a></li>
        <li style={style.li}><a style={style.a} href="sortpersons" data-navigo>sortPersons</a></li>
        <li style={style.li}><a style={style.a} href="addperson"  onClick={setU}data-navigo>addPerson</a></li>
      </ul>
    </div>
  )
}
export {Nav}

let style={
  background: 'white',
  li:{
    display: 'inline',
    padding: '2px',
    paddingRight: '4px',
    background: 'whitesmoke'
  },
  a:{
    textDecoration: 'none',
    color: 'green'    
  }
}