//var console = require('tracer').console();
import { Observable } from 'rxjs/Observable';
import {from} from 'rxjs/add/observable/from';
import {filter} from 'rxjs/add/operator/filter';
import {map} from 'rxjs/add/operator/map';

const array = [1, 2, 3, 4, 5, 6]
const evenNumbers = Observable.from(array)
  .filter(x => {
    return x % 2===0
  })

const deepObjModify=(str, val, obj)=>{
  val = val.trim()
  if(!val.match(/^[\[\{]/)){
    val = '"'+val+'"'
  }else{
    try{
      var vals = JSON.parse(val)
    }catch(error){
      val='"ERROR"'
    }
  }
  var strobj = JSON.stringify(obj)
  var st=0
  var arr =str.split('.')
  arr.map((k)=>{
    var idx= strobj.indexOf(k,st)
    st=idx
  })
  var col=strobj.indexOf(':',st)
  var ch =strobj[col+1]
  var begstr = strobj.substr(0,col+1)
  var endidx
  switch (true){
    case (ch=='"'):
      endidx=strobj.indexOf('"',col+2)
      break
    case (ch=='{'):
      endidx=strobj.indexOf('}',col+2)
      break
    case (ch=='['):
      endidx=strobj.indexOf(']',col+2)
      break
    case (!!ch.match(/[-0-9]+/)):
      var ss = strobj.substr(col+1)
      endidx = ss.match(/[-.0-9]+/)[0].length+col+1 
      break
    default:
      break
  }
  var endstr= strobj.substr(endidx)
  var newstr =begstr.concat(val,endstr)
  return JSON.parse(newstr)
}

const dog = (cat)=>{
  console.log(cat)
  return 'girl'
}

export{evenNumbers, deepObjModify, dog}