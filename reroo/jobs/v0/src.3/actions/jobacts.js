import { actionCreator } from '../rxred';

const setEdit = actionCreator((payload) => {
  return {
    type: 'SET_EDIT',
    payload
  }
});

export{setEdit}