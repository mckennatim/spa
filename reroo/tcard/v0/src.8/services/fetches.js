var moment = require('moment');
import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'

const lsh = ls.getItem();

const fetchTcard=(wk)=>{
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/tcard/week/'+wk
    let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{

          if(json.message){
            return {qmessage: json.message}
          }else{
            const processed= processDb4app(json)
            return processed
          }
        })
        .catch((e)=>{
          return {qmessage: e.message}
        })
      )         
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

const putTcard=(aday)=>{
  console.log('aday: ', aday)
  const tday = adjDay4db(cfg.firstday, aday)
  var lsh = ls.getItem();
  console.log(tday)
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/tcard/update'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({tday:tday})
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

const delTcardPu=(wdprt)=>{
  if (cfg.firstday!=1 && wdprt.slice(-1)>=cfg.firstday){
    wdprt= moment(wdprt).add(7, "days").format("YYYY-[W]WW-E")
  }
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/tcard/del'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({wdprt:wdprt})
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

export{fetchTcard, putTcard, delTcardPu}

const createBlWk =(wk)=>{
  let blwk=[]
  const wdprt = `${moment().format('YYYY')}-W${wk.toString().padStart(2,"0")}-`
  for (let i=1;i<=7;i++){
    let obj = {wdprt:wdprt+i, hrs:0, inout:[], jcost:[], jchrs:0}
    blwk.push(obj)
  }
  return blwk
}


const padWkData = (wk, wkarr)=>{
  const blwk = createBlWk(wk)
  const paddedwk= blwk.map((d)=>{
    const fwk = wkarr.filter((wd)=>wd.wdprt==d.wdprt)
    if(fwk.length>0){
      d=fwk[0]
    }
    return d
  })
  return paddedwk
}

const wkendLast = (apwa)=>{
  for(var i = 6; i<=7;i++ ){
    const fi = apwa.findIndex((a)=>a.wdprt.slice(-1)==i)
    const rec= apwa[fi]
    apwa.splice(fi, 1)
    apwa.push(rec)
  }
  const napwa = apwa.map((wa,i)=>{
    wa.idx=i
    return wa
  })
  return napwa
}

const sumThing=(arr, fld)=>{
  const narr=arr.map((a)=>a[fld])
  return narr
}

const processDb4app =(res)=>{
  const wkarr = wkendLast(adjWk4app(cfg.firstday, padWkData(res.wk, res.wkarr)))
  const hrs= sumThing(wkarr, 'hrs')
  const jchrs= sumThing(wkarr, 'jchrs')
  return {wkarr, hrs, jchrs, emailid:lsh.email, jobs:res.jobs, wstat:res.wstat}
}

const adjWk4app =(firstday, wkarr)=>{
  const appwkarr= wkarr
    .map((d)=>{
      if (firstday!=1 && d.wdprt.slice(-1)>=firstday){
        d.wdprt= moment(d.wdprt).subtract(7, "days").format("YYYY-[W]WW-E")
      }
      return d
    })
    .sort((a,b)=>a.wdprt > b.wdprt)
  return appwkarr
}

const adjDay4db = (firstday, rec)=>{
  let d = {...rec}
  if (firstday!=1 && d.wdprt.slice(-1)>=firstday){
    console.log('it is greater: ')
    d.wdprt= moment(d.wdprt).add(7, "days").format("YYYY-[W]WW-E")
  }
  return d
}