import React from 'react'
import ReactDOM from 'react-dom'

const geta=(dotstr, obj)=>{
  return dotstr.split(".")
    .slice(1)
    .reduce((xs,x)=>(xs && xs[x]) ? xs[x] : null , obj)
}

const deepObjModify=(dotstr, val, obj)=>{
  if(geta(dotstr, obj)){
    var keyarray = dotstr.split(".")
    var ls = keyarray.slice(-1)[0]
    keyarray
      .slice(1) 
      .reduce((xs,x)=>{
        if(xs && xs[x]) {
          if(x==ls){
            xs[x]=val
          }
          return xs[x]
        }
      }, obj)
    let newobj = {...obj}
    return newobj
  } else {
    return null
  }
}

const log = console.log.bind(console);

function el(id){
  return document.getElementById(id)
}

const dog = ()=>{
  return 'girl'
}

const render = (pg, para)=>{
  ReactDOM.render(React.createElement(pg, para), document.getElementById('rt')) 
}

const parseQuery = (query)=>{
  var obj = {};
  query.split('&')
    .map((term)=>{
      var ar = term.split('=')
      obj[ar[0]]=ar[1]
    }
  )
  return obj
}

export {geta, dog, render, log, parseQuery, el, deepObjModify}  

// var g ={
//   dog: 'bull', 
//   devid: 'CYURE', 
//   server:{
//     url:'10.0.1.1', 
//     mgtt: 1345
//   }, 
//   animal:{
//     pet: {
//       dog: 'uli', 
//       cat: 'mabibi', 
//       cnt: 234.56, 
//       arr: [1,2,3]
//     }, 
//     wild: 'lion'
//   }
// }

// var valstr = [3,4,5,6,7]
// var res =deepObjModify('g.animal.pet.cnt', valstr, g)
// console.log(res.animal.pet)
// console.log(res==g)
// /*currying example*/
// const stoLo = (i, s, a) =>{
//   return {
//     i: i, 
//     s: s, 
//     a: a
//   }
// }
// const sol = (i)=>((s,a)=>stoLo(i,s,a))
// console.log(sol(3)(5,6))