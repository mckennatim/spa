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