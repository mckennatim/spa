
const responsive=(state, action) =>{
  switch (action.type) {
    case 'SET_FOCUS':
      return {
        ...state,
        infocus: action.payload.infocus
      };    
    case 'PAGE_SWITCHED':
      return {
        ...state,
        page: action.payload
      };    
    case 'SET_DEVICE':
      // const ws = action.payload
      var idx
      // var sum = state.sizes.reduce((prev, curr, i)=>{ 
      //   if(prev < ws && ws <= curr){idx = i}
      //   return curr 
      // }, 0);  
      const bro = state.types[idx]   
      return {
        ...state, 
        size: action.payload,
        browser: bro
      }
    default:
      return state;
  }
}

export{responsive}