import {dog} from '../utilities/index.js'
//import {App} from '../components/App'

//WTF why cant I import this???????
const get=(path, props)=>{
  return path.split(".")
    .slice(1)
    .reduce((xs,x)=>(xs && xs[x]) ? xs[x] : null , props)
}

var ana={type: {animal: {dog: 'Ulysses'}}}

const storageLocal = (itemName)=>{
  var itemStr =  localStorage.getItem(itemName)
  const getItem=()=>{
    // console.log('in getItem')
    if(!localStorage.getItem(itemName)){
      return null
    }
    return JSON.parse(localStorage.getItem(itemName))
  }
  const setItem=(obj)=>{
    localStorage.setItem(itemName, JSON.stringify(obj))
  }
  var itemObj
  return{
    itemName: itemName,
    itemStr: itemStr,
    getItem: getItem,
    setItem: setItem,
    modItem: (key, val)=>{
      var ni= getItem();
      ni[key] =val
      setItem(ni)
    },
    addToSet: (ob)=>{
    },
    deleteToken: (em)=>{
    },
    getApps: ()=>{
    },
    setCurrentApps: (aps)=>{
    },
    getToken: ()=>getItem().token,
    getKey: (key)=>getItem()[key]
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
// console.log('testin in utilities');
// localStorage.setItem('test', "")
// setTimeout(()=>{
//   localStorage.removeItem('test')
//   localStorage.removeItem('hvac')
//   localStorage.removeItem('admin')
// },2000)
