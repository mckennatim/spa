//var console = require('tracer').console();
import {from} from 'rxjs/add/observable/from'; // eslint-disable-line no-unused-vars
import {filter} from 'rxjs/add/operator/filter';// eslint-disable-line no-unused-vars
import {map} from 'rxjs/add/operator/map';// eslint-disable-line no-unused-vars
import { Observable } from 'rxjs/Observable';

const evenNumbers = Observable.from(array)
  .filter(x => {
    return x % 2===0
  })

const isObservable = obs => obs instanceof Observable;

export{evenNumbers, isObservable}

const array = [1, 2, 3, 4, 5, 6]
let en=0
evenNumbers.subscribe((x)=>{
  en+=x
}) 
console.log(en)