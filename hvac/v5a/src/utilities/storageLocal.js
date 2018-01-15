import {dog} from '../utilities/index.js'
//import {App} from '../components/App'

//WTF why cant I import this???????
const get=(path, props)=>{
  return path.split(".")
  	.slice(1)
  	.reduce((xs,x)=>(xs && xs[x]) ? xs[x] : null , props)
}


var ana={type: {animal: {dog: 'Ulysses'}}}
// console.log(ana.type.animal.dog)
// console.log(get('ana.type.animal.dog', ana))
//console.log(App)

const storageLocal = (item)=>{
	var itemStr =  localStorage.getItem(item)
	const getItem=()=>{
		// console.log('in getItem')
		if(!localStorage.getItem(item)){
			return null
		}
		return JSON.parse(localStorage.getItem(item))
	}
	const setItem=(obj)=>{
		localStorage.setItem(item, JSON.stringify(obj))
	}
	var itemObj
	return{
		itemStr: itemStr,
		getItem: getItem,
		setItem: setItem,
		addToSet: (ob)=>{
			const isEmailIn=(el,i,x)=>(x[i].email==ob.email)
			var x = getItem()
			if (!x) x ={}
			if (!get('x.users', x)){
				x.users=[]
			}else{
				var idx = x.users.findIndex(isEmailIn)
				if (idx >-1){
					x.users[idx]=ob
				}else{
					console.log('not here adding new email/key')
					x.users.push(ob)
				}
			}
			setItem(x)
		},
		deleteToken: (em)=>{
			const isEmailIn=(el,i,x)=>(x[i].email==em)
			var x = getItem()
			if (!x) x ={}
			if (!get('x.users', x)){
				x.users=[]
			}else{
				var idx = x.users.findIndex(isEmailIn)
				if (idx >-1){
					console.log('found at '+idx+' and deleting')
					x.users.splice(idx, 1)
				}
			}
			setItem(x)
		},
		getApps: ()=>{
			var x = getItem()
			if (!x) x ={}
			if (get('x.currentApps',x)){
				return x.currentApps
			} else return null
		},
		setCurrentApps: (aps)=>{
			console.log('setting current aps in sl')
			console.log(aps)
			var x = getItem()
			if (!x) x ={}
			x.currentApps=aps
			setItem(x)
		},
		getCurrentToken: ()=>{
			var x = getItem()
			var eid = get('x.currentApps.id',x)
			const isEmailIn=(el,i,x)=>(x[i].email==eid)
			if(eid ){
				var users = get('x.users', x)
				if (users){
				  var idx = users.findIndex(isEmailIn)
				  if (idx>-1){
				  	return {email: eid, token: users[idx].token}
				  }
				}
			}
		}
	}
}


export{storageLocal}

/*currying example*/
const stoLo = (i, s, a) =>{
	return {
		i: i,
		s: s,
		a: a
	}
}
const sol = (i)=>((s,a)=>stoLo(i,s,a))
const sl = sol('item')
//console.log(sl("search", "array"))
