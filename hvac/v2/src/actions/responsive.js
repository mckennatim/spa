import { actionCreator } from '../rxred';

const switchPage = actionCreator((payload) => {
  return {
    type: 'PAGE_SWITCHED',
    payload
  }
});

export{switchPage}
