import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'

const fetchDevInfo=(dev)=>{
    var lsh = ls.getItem();
    let devinfo
    if(geta('lsh.token', lsh)){
      let url= cfg.url.api+'/admin/dev/'+dev
      // console.log(url)
      let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
      return(
        fetch(url, options)
          .then((response)=>response.json())
          .then((json)=>{
            if(json.message){
              return devinfo={qmessage: json.message}
            }else{
              let res = json[0]

              devinfo = {id:res.id,devid:res.devid, description:res.description, specs:{}, srarr:[], qmessage:'success' }
              if (res.specs){
                let specs= JSON.parse(res.specs)
                if (specs.sr){
                  let srarr= specs.sr
                  delete specs.sr
                  devinfo.srarr=srarr
                  devinfo.srBeingEdited = Array(srarr.length).fill(0)
                }
                const specKeys = Object.keys(specs)   
                devinfo.specKeys=specKeys
                devinfo.specBeingEdited = specKeys.map(()=>0)
                devinfo.specs=specs
              }

              console.log(devinfo)
              return devinfo
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

  export{fetchDevInfo}