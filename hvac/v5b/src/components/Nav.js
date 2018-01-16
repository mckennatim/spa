import React from 'react'
import {mStyle} from '../styles'
import {cfg} from '../utilities/getCfg'

const url = cfg.url.authqry
// const url = cfg.url.soauth+"/spa/"+cfg.appid+"?apiURL="+encodeURIComponent(cfg.url.api)+"&cbPath="+encodeURIComponent(cfg.cbPath)

const style = {
	background: '#CCCCCC'
}

const Nav = (props) =>(
	<div id="nav" style={style}>
		<h3>navigo-react-rxjs-responsive demo </h3>
		<div id="menu"> <ul>
			<li style={mStyle.li}><a style={mStyle.a} href={url}>register</a></li>
			<li style={mStyle.li}><a style={mStyle.a} href="home" data-navigo>home</a></li>
			<li style={mStyle.li}><a style={mStyle.a} href="about" data-navigo>about</a></li>
			<li style={mStyle.li}><a style={mStyle.a} href="dog" data-navigo>dog</a></li>
			<li style={mStyle.li}><a style={mStyle.a} href="registered" data-navigo>registered</a></li>
		</ul></div><br/>
		<hr/>
	</div>
	)
export {Nav}
