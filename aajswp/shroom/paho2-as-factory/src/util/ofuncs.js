//var console = require('tracer').console();
import {from} from 'rxjs/add/observable/from'; // eslint-disable-line no-unused-vars
import {filter} from 'rxjs/add/operator/filter';// eslint-disable-line no-unused-vars
import {map} from 'rxjs/add/operator/map';// eslint-disable-line no-unused-vars
import { Observable } from 'rxjs/Observable';
import{geta} from './index.js'

const array = [1, 2, 3, 4, 5, 6]
const evenNumbers = Observable.from(array)
  .filter(x => {
    return x % 2===0
  })

let en=0
evenNumbers.subscribe((x)=>{
  en+=x
}) 
console.log(en)

const deepObjModify=(dotstr, val, obj)=>{
  if(geta(dotstr, obj)){
    var newobj = dotstr.split(".")
      .slice(1) 
      .reduce((xs,x)=>{
        if(xs && xs[x]) {
          return xs[x]
        }else {
          return null 
        }
      }, obj)
    }
    return newobj
  }

  // return geta(dotstr, obj)
  // val = val.trim()
  // // if(!val.match(/^[\[\{]/)){
  // if(!val.match(/^[[{]/)){
  //   val = '"'+val+'"'
  // }else{
  //   val='"ERROR"'
  // }
  // var strobj = JSON.stringify(obj)
  // var st=0
  // var arr =dotstr.split('.')
  // arr.map((k)=>{
  //   var idx= strobj.indexOf(k,st)
  //   st=idx
  // })
  // var col=strobj.indexOf(':',st)
  // var ch =strobj[col+1]
  // var begstr = strobj.substr(0,col+1)
  // var endidx
  // switch (true){
  //   case (ch=='"'):
  //     endidx=strobj.indexOf('"',col+2)
  //     break
  //   case (ch=='{'):
  //     endidx=strobj.indexOf('}',col+2)
  //     break
  //   case (ch=='['):
  //     endidx=strobj.indexOf(']',col+2)
  //     break
  //   case (!!ch.match(/[-0-9]+/)):
  //     var ss = strobj.substr(col+1)
  //     endidx = ss.match(/[-.0-9]+/)[0].length+col+1 
  //     break
  //   default:
  //     break
  // }
  // var endstr= strobj.substr(endidx)
  // var newstr =begstr.concat(val,endstr)
  // return JSON.parse(newstr)
//

const dog = (cat)=>{
  console.log(cat)
  return 'girl'
}

export{evenNumbers, deepObjModify, dog}