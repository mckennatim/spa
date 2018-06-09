import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'

const getLastDev=(base)=>{
    var lsh = ls.getItem();
    let devinfo
    if(geta('lsh.token', lsh)){
      let url= cfg.url.api+'/admin/b/nextdev/'+base
      // console.log(url)
      let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
      return(
        fetch(url, options)
          .then((response)=>response.json())
          .then((json)=>{
            if(json.message){
              return devinfo={qmessage: json.message}
            }else{
              let res = json.devid.replace(base,"")
              const l = res.length
              res = base+(res*1+1).toString().padStart(l,"0")
              // console.log(res)
              return res
            }
          })
          .catch((e)=>{
            // console.log(e.message)
            devinfo={qmessage: e.message}
            return devinfo
          })
      )   
    }else{
      let p2 =Promise.resolve({qmessage:'you dont exist, re-register'})
      return p2
    }
  }

const fetchDevInfo=(dev)=>{
    var lsh = ls.getItem();
    let devinfo
    if(geta('lsh.token', lsh)){
      let url= cfg.url.api+'/admin/b/dev/'+dev
      // console.log(url)
      let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
      return(
        fetch(url, options)
          .then((response)=>response.json())
          .then((json)=>{
            if(json.message){
              return devinfo={qmessage: json.message}
            }else{
              let res = json
              console.log(res)
              let specs= JSON.parse(res.devinfo.specs)
              res.devinfo.specs=specs
              console.log(res)
              return res
            }
          })
          .catch((e)=>{
            // console.log(e.message)
            devinfo={qmessage: e.message}
            return devinfo
          })
      )   
    }else{
      let p2 =Promise.resolve({qmessage:'you dont exist, re-register'})
      return p2
    }
  }

  export{fetchDevInfo, getLastDev}