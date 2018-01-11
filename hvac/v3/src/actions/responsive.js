import { actionCreator } from '../rxred';

const switchPage = actionCreator((payload) => {
  console.log('act: switch page');
  console.log(payload);
  return {
    type: 'PAGE_SWITCHED',
    payload
  }
});

export{switchPage}
