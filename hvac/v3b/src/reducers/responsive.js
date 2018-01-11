const responsive=(state, action) =>{
  switch (action.type) {
    case 'PAGE_SWITCHED':
      console.log('switching page');
      return {
        ...state,
        page: action.payload
      };
    default:
      return state;
  }
}

export{responsive}
