import {qOnFocus, qOnPageSwitch} from '../services/interface'

const cambio=(state, action) =>{
  switch (action.type) {
    case 'SET_FOCUS':
      qOnFocus(state.page.name, null, action.payload.infocus)
      return {
        ...state,
        infocus: action.payload.infocus
      };    
    case 'PAGE_SWITCHED':
      console.log('cambio reducer PAGE_SWITCHED to ', action.payload, ' from ', state.page.name) 
      qOnPageSwitch(action.payload.name)
      return {
        ...state,
        page: action.payload
      };    
    default:
      return state;
  }
}

export{cambio}