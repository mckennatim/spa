import {expect} from 'chai';
import {deepObjModify, dog} from '../src/util/ofuncs'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

describe("a subject", ()=>{
	it('creates an observable that can be observed',()=>{
		const action$ = new Subject();
		const action = {dog:'fred'}
		var cstate = {cat:'mabibi'}
		action$.subscribe((state)=>{
			cstate = state 
		})
		console.log(cstate)
		//fails until
		action$.next(action)
		console.log(cstate)
		expect(cstate).to.equal(action)
	})
	it('startWith init',()=>{
		const action$ = new Subject();
		const action = {dog:'fred'}
		var init = {cat:'mabibi'}
		var cstate
		const createStore = (init)=>action$.startWith(init)
		const store = createStore(init)
		store.subscribe((state)=>{
			cstate = state 
		})
		console.log(cstate)
		expect(cstate).to.equal(init)
		action$.next(action)
		console.log(cstate)
		expect(cstate).to.equal(action)
	})

})


describe("a dog is a duck",()=>{
	it('tries dog badly ok', ()=> {
		var ani = "duck"
		console.log(dog(ani))
		expect(ani).to.equal("duck");
	})
	it('deepObjMod an object then access it', ()=>{
		var g ={
			dog: 'bull', 
			devid: 'CYURE', 
			server:{
				url:'10.0.1.1', 
				mgtt: 1345
			}, 
			animal:{
				pet: {
					dog: 'uli', 
					cat: 'mabibi', 
					cnt: 234.56, 
					arr: [1,2,3]
				}, 
				wild: 'lion'
			}
		}

		console.log(g)
		console.log('g.animal.pet.cnt'.split("."))
		console.log('-----------------------------------')
		var valstr = ' [3,4,5,6,7]'
		var j = (deepObjModify('g.animal.pet.cnt', valstr, g))
		console.log(j)
		expect(j.animal.pet.cnt[3]).to.equal(JSON.parse(valstr)[3])
	})
})