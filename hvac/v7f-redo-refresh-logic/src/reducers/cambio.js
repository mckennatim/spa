import {maybeConnect, connectOrReqOrNot} from '../services/interface'

const cambio=(state, action) =>{
  switch (action.type) {
    case 'SET_FOCUS':
      // console.log('cambio reducer SET_FOCUS to ', action.payload)
      // console.log('from ', state.page.name)
      maybeConnect(state.page.name, null, action.payload.infocus)
      // if(!action.payload.infocus) {
      //   mqttEnd()
      // }else{
      //   mqttConnect()
      // }
      return {
        ...state,
        infocus: action.payload.infocus
      };    
    case 'PAGE_SWITCHED':
      console.log('cambio reducer PAGE_SWITCHED to ', action.payload)
      console.log('from ', state.page.name)
      connectOrReqOrNot(action.payload.name)
      return {
        ...state,
        page: action.payload
      };    
    default:
      return state;
  }
}

export{cambio}