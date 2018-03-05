import jsenv from '../../envmy.json'
import env from '../../env.json'
import {storageLocal} from './storageLocal'
import moment from 'moment-timezone'


const cfg= env[jsenv.m||'local']

const authqry = cfg.url.soauth+"/spa/"+cfg.appid+"?apiURL="+encodeURIComponent(cfg.url.api)+"&cbPath="+encodeURIComponent(cfg.cbPath)

cfg.url.authqry = authqry

const ls = storageLocal(cfg.appid)

const createSchedObj=(sched, tz)=>{
  let schedcpy = sched.slice()
  let just1st = sched.slice(0,1)
  let firs = just1st[0]
  let las = firs.slice()
  las[0]=23
  las[1]=59 
  schedcpy.push(las)
  let nowtz = moment().tz(tz).format('h:mma')
  let now = moment(nowtz,'h:mma')
  let schedObj={}
  let smod = []
  let setpt = (schedcpy[0][2]+schedcpy[0][3])/2
  const schedarr = schedcpy.slice(1).reduce((beforeMoment,afterArr,idx)=>{
    let sobj={}
    let afterMoment  = moment(`${afterArr[0]}:${afterArr[1]}`, 'h:mm')
    //let t = beforeMoment.format('h:mma')+now.isAfter(beforeMoment)+now.format('h:mma')+now.isBefore(afterMoment)+afterMoment.format('h:mma')
    sobj.time = beforeMoment.format('h:mma')
    sobj.setpt= setpt
    setpt = (afterArr[2]+afterArr[3])/2
    if(now.isAfter(beforeMoment) && now.isBefore(afterMoment)){
      schedObj.timeleft=afterMoment.diff(now,'hours')+':'+afterMoment.diff(now,'minutes')%60
      schedObj.idx=idx
      schedObj.now = now.format('h:mma')
    }
    smod.push(sobj)
    return afterMoment
  },moment(`${schedcpy[0][0]}:${sched[0][1]}`, 'h:mm'))
  schedObj.sched = smod
  return schedObj
}

export{ls, cfg, createSchedObj}
