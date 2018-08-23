import React from 'react' // eslint-disable-line no-unused-vars
import {mStyle} from '../styles'
import {cfg} from '../utilities/getCfg'

const style = {
  background: '#CCCCCC'
}

const Nav = () =>(
  <div id="nav" style={style}>
    
    <div id="menu"> <ul>
      <li style={mStyle.li}><a style={mStyle.a} href={cfg.url.authqry}>register</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="home" data-navigo>home</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="about" data-navigo>about</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="products" data-navigo>products</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="products/333/inv" data-navigo>a product</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="jobs" data-navigo>jobs</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="addjob" data-navigo>addjob</a></li>
    </ul></div><br/>
    <hr/>
  </div>
  )
export {Nav}

