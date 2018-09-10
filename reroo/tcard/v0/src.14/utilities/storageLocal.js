

const storageLocal = (itemName)=>{
  var itemStr =  localStorage.getItem(itemName)
  const getItem=()=>{
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
      if(ni){
        ni[key] =val
        setItem(ni)
      }
    },
    removeItem: ()=>localStorage.removeItem(itemName),
    getToken: ()=>getItem().token,
    getKey: (key)=>{
      if(getItem()){
        return getItem()[key]
      }else{
        return null
      }
      
    }
  }
}


export{storageLocal}


