import {responsive} from './responsive'
import{mqtt}from './mqtt'

function test(state, action) {
  switch (action.type) {
    case 'GITHUB_FOLLOWERS_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'GITHUB_FOLLOWERS_LOADED':
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case 'NAME_CHANGED':
      return {
        ...state,
        isLoading: false,
        name: action.payload
      };
    // case 'PAGE_CHANGED':
    //   return {
    //     ...state,
    //     rtpg: action.payload
    //   };
    default:
      return state;
  }
}

function combineReducers(reducersObject) {
  const keys = Object.keys(reducersObject);
  //console.log(keys)
  return (state = {}, action) => keys.reduce((currState, key) => {
    const reducer = reducersObject[key];
    return {
      ...currState,
      [key]: reducer(currState[key], action)
    };
  }, state);
}

var reducersObj={responsive, test, mqtt}
const rootReducer = combineReducers(reducersObj)
export {rootReducer}
