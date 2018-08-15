import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'


const fetchJobs=(wk)=>{
  var lsh = ls.getItem();
  console.log(lsh)
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/jobs/list/'+wk
    let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          if(json.message){
            return {qmessage: json.message}
          }else{
            return json
          }
        })
        .catch((e)=>{
          return {qmessage: e.message}
        })
      )         
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}
const postJobs=(jobs,wk)=>{
  var lsh = ls.getItem();
  console.log(lsh)
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/jobs/post/'+wk
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(jobs)
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

export{fetchJobs}