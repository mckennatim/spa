const cambio=(state, action) =>{
  switch (action.type) {
    case 'SET_FOCUS':
      return {
        ...state,
        infocus: action.payload.infocus
      };    
    case 'PAGE_SWITCHED':
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        page: action.payload
      };    
    default:
      return state;
  }
}

export{cambio}