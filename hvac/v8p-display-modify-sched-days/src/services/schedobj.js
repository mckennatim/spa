import {createSchedObj,ls } from '../utilities/getCfg'
import {isEqual} from 'underscore'

let schedobj = {sched:[]}
const sendCopyOfSchedobj=(cpy)=>{
  schedobj = cpy
  console.log('schedobj: ',JSON.stringify(schedobj))
}

const getSchedobjCopy = ()=>{
  return schedobj
}
const covertSchedFromDb =(da)=>{
  let tz=ls.getKey('tz')
  ///create fitsacc from a
  let fda = da.shift()
  console.log(fda)
  let fsched = createSchedObj(JSON.parse(fda.sched), tz).sched
  let firstacc = convert1Db(fda, fsched)
  console.log(firstacc)
  let narr = da.reduce((acc,a)=>{
    let sched=createSchedObj(JSON.parse(a.sched), tz).sched
    let lpop = acc.pop()
    if(isEqual(lpop.sched, sched)){
      console.log('they are equal')
      lpop.days = lpop.days + ' ' + dayNameArr[a.dow] 
      acc.push(lpop)
      //add to lpop.days and push back on array and return acc
    }else{
      acc.push(lpop)
      acc.push(convert1Db(a, sched))
      //push lpop back on acc, noj = convert1db(a) from a, push noj return acc
    }
    return acc
  },[firstacc])
  return narr
}

const convert1Db=(a, sched)=>{
  let noj = {}
  noj.devid = a.devid
  noj.senrel= a.senrel
  noj.sr = ls.findLabel(a.devid, a.senrel )
  noj.dow = a.dow
  noj.sched = sched
  noj.days = dayNameArr[a.dow]
  return noj  
}
  // let priorSched = [[]]
  // let as = da.map((a)=>{
  //   let sched=JSON.parse(a.sched)
  //   if(isEqual(priorSched, sched)){

  //   }
  //   let noj = {}
  //   noj.devid = a.devid
  //   noj.senrel= a.senrel
  //   noj.sr = ls.findLabel(a.devid, a.senrel )
  //   noj.dow = a.dow
  //   noj.sched = createSchedObj(sched, tz).sched
  //   return noj
  // })
//   return as
// }

let dayNameArr =['def', 'M', 'T', 'W', 'Th', 'F', 'S', 'Su', 'hld']
// let dayNameArr2 =['d', 'M', 'T', 'W', 'Th', 'F', 'S', 'Su', 'h']

export{sendCopyOfSchedobj, getSchedobjCopy, covertSchedFromDb, dayNameArr}