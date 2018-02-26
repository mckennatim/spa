import {srUpdateQdata, schedUpdateQdata} from './interface'

const qreducer=(state, action) =>{
  let modstate
  switch (action.type) {
    case 'SRSTATE_CHANGED':
      modstate = srUpdateQdata(state, action.payload)
      return modstate;
    case 'SCHED_CHANGED':
      modstate = schedUpdateQdata(state, action.payload)
      return modstate;
    default:
      return state;
  }
}

export{qreducer}