import React from 'react' // eslint-disable-line no-unused-vars
import {mStyle} from '../styles'
import {cfg} from '../utilities/getCfg'

console.log('cfg: ', cfg.url.jobs)

const Nav = () =>(
    <div id="menu"> 
    <ul>
      <li style={mStyle.li}><a style={mStyle.a} href={cfg.url.authqry}>register</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="about" data-navigo>about</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href="tcard" data-navigo>tcard</a></li>
      <li style={mStyle.li}><a style={mStyle.a} href={cfg.url.jobs}>jobs</a></li>
    </ul>
    </div>
  )
export {Nav}

