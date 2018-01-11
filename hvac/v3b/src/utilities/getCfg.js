import jsenv from '../../envmy.json'
import env from '../../env.json'
import {storageLocal} from './storageLocal'
// console.log(storageLocal);
const cfg= env[jsenv.m||'local']

const aurl = cfg.url.soauth+"/spa/"+cfg.appid+"?apiURL="+encodeURIComponent(cfg.url.api)+"&cbPath="+encodeURIComponent(cfg.cbPath)

const url2cb = (cb) =>{
	return cfg.url.soauth+"/spa/"+cfg.appid+"?apiURL="+encodeURIComponent(cfg.url.api)+"&cbPath="+encodeURIComponent(cb)
}

const ls = storageLocal(cfg.appid)

export{ls, cfg, aurl, url2cb}
