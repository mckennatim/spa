import React from 'react'
import {router} from './App'
import {pStyle} from '../styles'
import {aurl, url2cb, ls} from '../utilities/getCfg'
import {parseHash} from '../utilities'
//const queryString = require('query-string')
/*
login page has a button to send you to authenticate

it should return and put the appid and  and emailtoken in ls
then it should go to loclist
*/
console.log('in Login');
// const urlData =parseHash(location.hash)
// console.log(urlData);
// if(Object.keys(urlData).length>0){
// 	console.log('hay urlData', Object.keys(urlData).length);
// }else console.log('no hay urlData', Object.keys(urlData).length);
// const url = url2cb('#login');
//router.navigate('/login')
//console.log(location.href.replace(location.hash,""))
// const style = {
// 	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
// }
// pStyle.outer.background='#C4A265'

function Login(props){
	const style = {
	...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
	}
  const { name } = props;
  return(
    <div style={style.outer} >
			<h4>in login {name} </h4>
			<a href={url}><button type="button">login</button></a>
		</div>
    )
}

export {Login}
