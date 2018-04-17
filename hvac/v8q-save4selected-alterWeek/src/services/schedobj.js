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

const alterWeek=(wschedArr, newSchedObj, dayselected,cidx)=>{
  /*wschedo is[{devid,sennrel:0,sr:music, days:T TH, dow:4,sched:[{time,setpt}]},]
    dayselected is [ 9, 9, 9, 9, 4, 5, 9, 9, 9 ]
  */
  let nWsched = wschedArr.slice()
  let curSchedObj = nWsched.splice(cidx,1)[0]
  let newDays = readDayselected(dayselected)
  newSchedObj.days = newDays.join(' ')
  newSchedObj.dow = dayNameArr.indexOf(newDays[0])
  let oldDaysArr = curSchedObj.days.split(' ')

  let newWeekSched = nWsched.map((arec)=>{
    let days = arec.days.split(' ')
    days.map((d,i)=>{
      if (newDays.includes(d)){
        days.splice(i,1)
      }
    })
    if(days.length>0){
      arec.days = days.join(' ')
      return arec
    }
  })
  oldDaysArr.map((d,i)=>{
    if (newDays.includes(d)){
      oldDaysArr.splice(i,1)
    }
  })
  if(oldDaysArr.length>0){
    curSchedObj.days=oldDaysArr.join(' ')
    newWeekSched.push(curSchedObj)
  }
  newWeekSched.push(newSchedObj)
  newWeekSched.sort((a,b)=>{
    return a.dow-b.dow
  })
  return newWeekSched
}

const readDayselected = (dayselected)=>{
  let days = []
  dayselected.map((d)=>{
    if (d<9){
      days.push(dayNameArr[d])
    }
  })
  return days
}

let dayNameArr =['def', 'M', 'T', 'W', 'Th', 'F', 'S', 'Su', 'hld']
// let dayNameArr2 =['d', 'M', 'T', 'W', 'Th', 'F', 'S', 'Su', 'h']

export{sendCopyOfSchedobj, getSchedobjCopy, covertSchedFromDb, dayNameArr, alterWeek}