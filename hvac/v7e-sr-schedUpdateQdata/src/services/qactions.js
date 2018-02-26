import { qactionCreator } from './interface';

const setFocus = qactionCreator((payload) => {
  return {
    type: 'SET_FOCUS',
    payload
  }
});




export{setFocus}