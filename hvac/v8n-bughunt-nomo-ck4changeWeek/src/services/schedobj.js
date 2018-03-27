

let schedobj = {sched:[]}
const sendCopyOfSchedobj=(cpy)=>{
  schedobj = cpy
  console.log('schedobj: ',JSON.stringify(schedobj))
}

const getSchedobjCopy = ()=>{
  return schedobj
}

export{sendCopyOfSchedobj, getSchedobjCopy}