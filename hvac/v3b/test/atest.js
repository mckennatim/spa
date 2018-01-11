({
    babel: true
})
//ctl+k then q to start quokka
//ctl+k then s to stop quokka
//ctl+sht+p search quokka for more
import React from 'react'

var Rx =require('rxjs');
var startWith = require('rxjs/add/operator/startWith');

const action$ = new Rx.Subject();
const action = {dog:'fred'}
var init = {cat:'mabibi'}
var cstate
//const createStore = (init)=>action$.startWith(init)
const createStore = (init)=>{
	return action$.startWith(init)
}
createStore(init).subscribe((state)=>cstate=state)
// action$
// 	.startWith(init)
// 	.subscribe((state)=>{
// 		cstate = state
// 	})
// createStore.subscribe((state)=>{
// 	cstate = state
// })
console.log(cstate)
action$.next(action)
console.log(cstate)

function add(x){
  return function(y){
    return x + y;
  };
}
var addTwo = add(2);
addTwo(4) === 6; // true
console.log(add(3)(4) === 7); // true

const edd = (x)=>(y)=>x+y
console.log(edd(5)(6));
