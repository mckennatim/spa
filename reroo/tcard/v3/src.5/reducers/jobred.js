const ejob=(state, action) =>{
  switch (action.type) {
    case 'SET_EDIT':
      return {
        ...state,
        job: action.payload.job, 
        categories: action.payload.categories,
        idx: action.payload.idx,
        coid: action.payload.coid
      };    
    default:
      return state;
  }
}

export{ejob}