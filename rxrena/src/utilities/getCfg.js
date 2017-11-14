import jsenv from '../../envmy.json'
import env from '../../env.json'
import {storageLocal} from './storageLocal'

const cfg= env[jsenv.m||'local']

const getCfg =()=>{
	return cfg
}

const ls = storageLocal(cfg.appid)
ls.deleteToken("tim2@sitebuilt.net")

export{getCfg, ls, cfg}