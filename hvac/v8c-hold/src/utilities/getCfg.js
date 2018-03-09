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
  schedcpy.slice(1).reduce((beforeMoment,afterArr,idx)=>{
    let sobj={}
    let afterMoment  = moment(`${afterArr[0]}:${afterArr[1]}`, 'h:mm')
    //let t = beforeMoment.format('h:mma')+now.isAfter(beforeMoment)+now.format('h:mma')+now.isBefore(afterMoment)+afterMoment.format('h:mma')
    sobj.time = beforeMoment.format('h:mma')
    sobj.setpt= setpt
    setpt = (afterArr[2]+afterArr[3])/2
    if(now.isSameOrAfter(beforeMoment) && now.isBefore(afterMoment)){
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


const modifySched =(sched,tz,schedObj,boostFor, delayTil)=>{
  let sttz
  if (delayTil){
    sttz = moment(delayTil,'H:mm').tz(tz).format('h:mma')
  }else {
    sttz = moment().tz(tz).format('h:mma')
  }
  let stm = moment(sttz,'h:mma').format('H:mm')
  /*utility funcs*/
  const tmColon2min =(hms)=>{
    let hma = hms.split(':')
    return hma[0]*60 + hma[1]*1    
  }
  const tmArr2min = (hma)=>{
    return hma[0]*60 + hma[1]*1 
  }
  const mins2arr = (mins)=>{
    let h = Math.floor(mins/60)
    let m = mins%60
    return [h, m]
  }
  const minsYsetpt =(mins,setpt)=>{
    return mins2arr(mins).concat(setpt)
  }
  /*  setup reduce  */
  let smin =tmColon2min(stm)
  let xmin =tmColon2min(boostFor)
  let emin = smin+xmin
  // console.log('emin ', emin, ' eminarr ', mins2arr(emin))
  let zmin = tmColon2min('23:59')
  if(emin>zmin)emin=zmin
  console.log('smin: ',smin, ' ', mins2arr(smin), ', emin: ', emin, ' ', mins2arr(emin) )
  console.log(JSON.stringify(sched))

  let smod = []
  let remainder = [50,48].slice()
  sched.map((x,i)=>{
    let xmin=tmArr2min(x)
    if(xmin<smin || (smin==null && emin==null)){
      smod.push(x)
    }else if(smin!==null){
      smod.push(minsYsetpt(smin,[69,67]))
      smin=null
    }
    if(sched.length==1){
      remainder = x.slice(2)
      smod.push(minsYsetpt(smin,[69,67]))
      smin=null
    }
    if(emin<xmin && emin !==null){
      smod.push(minsYsetpt(emin,remainder))
      emin=null
      smod.push(x)
    }else if(i==sched.length-1 && emin!==null){
      smod.push(minsYsetpt(emin,remainder))
      emin=null
    }
    if(smod.length>5){
      smod.shift()
    }
    remainder = x.slice(2)
    return x
  })
  return smod
}

export{ls, cfg, createSchedObj, modifySched}

