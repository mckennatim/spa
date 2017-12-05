/*
A reducer is a method .reduce calls to apply a function against an accumulator and each element in an array (from left to right)

A transducer is a function that takes a reducer as an argument and returns a reducer


*/
({
    babel: true
})
//ctl+k then q to start quokka
//ctl+k then s to stop quokka
//ctl+sht+p search quokka for more

//these are functions have become decorators for our reducers
const filter = (predicate)=>{
  return(acc,val)=>{
    if(predicate(value)) acc.push(val)
    return acc
  }
}

const map = (xf) =>{
  return(acc,val)=>{
    acc.push(xf(val))
    return acc
  }
}

//transform
const dbl = n => n*2
//predicate
const isev = n => n%2===0

//just like
const add = (x)=>(y)=>x+y;
console.log(add(2)(3));
//filt(predicate) returns a reducer
const filt = (predicate)=>(reducer)=>{
  return(acc,val)=>{
    if(predicate(val)) return reducer(acc,val);
    return acc;
  }
}
console.log([1,2,3,4].map(dbl));
console.log([1,2,3,4].filter(isev));
console.log([1,2,3,4].reduce(filt(isev)(map(dbl)),[]))

const nmap = new Map()
nmap.set('a',1)
nmap.set('b',2)
nmap.set('c',3)
nmap.set('d',4)
console.log(nmap);
