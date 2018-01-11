import{responsive}from './responsive'
//import {combineReducers} from '../rxred.js'

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

const combineReducers=(reducersObject)=> {
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

var reducersObj={responsive, test}
const rootReducer = combineReducers(reducersObj)
export {rootReducer}
