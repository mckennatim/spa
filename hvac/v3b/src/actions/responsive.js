import { actionCreator } from '../rxred';

const switchPage = actionCreator((payload) => {
  console.log('act: switch page');
  return {
    type: 'PAGE_SWITCHED',
    payload
  }
});

export{switchPage}
