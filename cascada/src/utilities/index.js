import envmy from '../../envmy.json'
import env from '../../env.json'

// const getCfg = ()=>{
// 	return env[envmy.m||'local']
// }
var mess, userEmail, userToken

var cfg=env[envmy.m||'local']

const stripQuery=()=>{
  var url = window.location.href;
  var value = url.substring(8)
  value=value.substring(value.indexOf('/')+1).split("?")[0];
  return value;     
}

const parseQuery = (query)=>{
	var obj = {};
	query.substr(1).split('&')
		.map((term)=>{
			var ar = term.split('=')
			obj[ar[0]]=ar[1]
		}
	)
	return obj
}

const get=(path, props)=>{
  return path.split(".")
  	.slice(1)
  	.reduce((xs,x)=>(xs && xs[x]) ? xs[x] : null , props)
}

const getToken=(appid)=>{
	var t = JSON.parse(localStorage.getItem(appid))
	return t
}

const ck4token=()=>{
	var emtok = getToken(cfg.appid)
	if(!get('emtok.token',emtok)){
		mess="You need a token (and owner's OK) to control a device. Press Register to get a token "
		console.log(mess)
		//dmessage.innerHTML=mess
		//alert(mess)
		return {email:'anybody', token:'', auth: false}
	} else{
		return {...emtok, auth:true}
		// userEmail=emtok.email
		// userToken=emtok.token
	}
}

const ck4query=(cfg)=>{
	//console.log(cfg)
	var query = window.location.search
	console.log("query length= ",query.length)
	//dmessage.innerHTML="doggy"
	if(query.length>1){
		var qobj = parseQuery(query)
		console.log(qobj)
		if(get('qobj.token',qobj)){
			localStorage.setItem(cfg.appid, JSON.stringify(qobj))
		}else{
			mess = decodeURIComponent(qobj.message)+' or register as a different user'
			console.log(mess)
			//dmessage.innerHTML=mess
			localStorage.removeItem(cfg.appid)
		}
	}
	//window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
	
}



export {stripQuery, ck4query, get, cfg, ck4token}