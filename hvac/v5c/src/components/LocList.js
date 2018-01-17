import React from 'react'
import {cfg, ls} from '../utilities/getCfg'
import {geta} from '../utilities'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

function LocList(props){
	const { name } = props.test;

	const onlyOne=(locid)=>{
		console.log(locid);
	}
	const makeList=(loclist)=>{
		console.log(loclist);
	}
	const isOnly1=(json)=>{
		json.length==1 ? onlyOne(json[0]) : makeList(json)
	}

	var lsh = ls.getItem();
	if(geta('lsh.token', lsh)){
		console.log(lsh.token);
		var url=cfg.url.api+'/dedata/loclist/'+cfg.appid+'/'+ls.getKey('email')
		console.log(url);
    fetch(url,{
      headers: {
        'Authorization': 'Bearer ' + ls.getKey('token')
      }
    })
      .then((response)=>response.json())
      .then((json)=>{
        isOnly1(json)
      })
	}else{
		console.log('null is false');
	}
  return(
    <div style={style.outer} ><h4>in doLocList {name} </h4></div>
    )
}

export {LocList}
