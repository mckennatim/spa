import { actionCreator } from '../rxred';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/dom/ajax';
import { map } from 'lodash';

const setDeviceType = actionCreator((payload) => {
  return {
    type: 'SET_DEVICE',
    payload
  }
});

const switchPage = actionCreator((payload) => {
  return {
    type: 'PAGE_SWITCHED',
    payload
  }
});

const loadGithubFollowers = actionCreator((payload) => {
  const url = `https://api.github.com/users/${payload}/followers`;
  return {
    type: 'GITHUB_FOLLOWERS_LOADING',
    payload: Observable.ajax(url)
      .map((xhr) => {
      	console.log(xhr)
      	return map(xhr.response, 'login')
      })
      .map((followers) => {
      	console.log(followers)
      	return({
	        type: 'GITHUB_FOLLOWERS_LOADED',
	        payload: followers
	      })
      })
  };
});

export{loadGithubFollowers, setDeviceType,	switchPage}