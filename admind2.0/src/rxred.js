import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import {rootReducer} from './reducers';
import { isObservable } from './utilities';

const action$ = new Subject();

const createStore = (initState) =>
  action$
    .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
    .startWith(initState)
    .scan(rootReducer);

const actionCreator = (func) => (...args) => {
  const action = func.call(null, ...args);
  action$.next(action);
  if (isObservable(action.payload))
    action$.next(action.payload);
  return action;
};

// const combineReducers=(reducersObject)=> {
//   const keys = Object.keys(reducersObject);
//   //console.log(keys)
//   return (state = {}, action) => keys.reduce((currState, key) => {
//     const reducer = reducersObject[key];
//     return {
//       ...currState,
//       [key]: reducer(currState[key], action)
//     };
//   }, state);
// }

export{actionCreator, createStore}