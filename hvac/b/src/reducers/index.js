

function test(state, action) {
  switch (action.type) {
    case 'GITHUB_FOLLOWERS_LOADING':
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}

const rootReducer = test
export {rootReducer}

