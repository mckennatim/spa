import { actionCreator } from '../rxred';

const switchPage = actionCreator((payload) => {
  console.log('actions/switchPage');
  console.log(payload);
  return {
    type: 'PAGE_SWITCHED',
    payload
  }
});

export{switchPage}
