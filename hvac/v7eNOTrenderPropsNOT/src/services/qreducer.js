import {xfrmSrstate} from './interface'

const qreducer=(state, action) =>{
  switch (action.type) {
    case 'SET_READY':
      console.log('reducer: action.payload.ready: ',JSON.stringify(action.payload.ready))
      return {
        ...state,
        ready: action.payload.ready
      };    
    case 'SRSTATE_CHANGED':
      let modstate = xfrmSrstate(state, action.payload)
      return modstate;
    default:
      return state;
  }
}

export{qreducer}