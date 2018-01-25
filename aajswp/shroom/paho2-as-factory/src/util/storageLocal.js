// const get=(path, props)=>{
//   return path.split(".")
//     .slice(1)
//     .reduce((xs,x)=>(xs && xs[x]) ? xs[x] : null , props)
// }

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
    getApps: ()=>{
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
console.log(sol(3)(5,6))


