import React from 'react' // eslint-disable-line no-unused-vars
import {cfg} from '../utilities/getCfg'

const Nav = () =>(
  <div style={style} id="menu"> 
    <ul>
      <li style={style.li}><a style={style.a} href={cfg.url.authqry}>register</a></li>
      <li style={style.li}><a style={style.a} href="home" data-navigo>home</a></li>
      <li style={style.li}><a style={style.a} href="about" data-navigo>about</a></li>
      <li style={style.li}><a style={style.a} href="jobs" data-navigo>jobs</a></li>
      <li style={style.li}><a style={style.a} href="sortjobs" data-navigo>sortjobs</a></li>
      <li style={style.li}><a style={style.a} href="addjob" data-navigo>admojob</a></li>
    </ul>
  </div>
  )
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