import {ls, cfg} from '../utilities/getCfg'
import {geta} from '../utilities/wfuncs'

const fetchSettings=()=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/settings'
    let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          if(json.message){
            return {qmessage: json.message}
          }else{
            return json[0]
          }
        })
        .catch((e)=>{
          return {qmessage: e.message}
        })
      )         
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! Try re-registering '})
    return p2
  }
}
const fetchRates=()=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/rates'
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
    let p2 =Promise.resolve({qmessage:'you dont exist! Try re-registering '})
    return p2
  }
}
const fetchState=(st)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/state/'+st
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
    let p2 =Promise.resolve({qmessage:'you dont exist! Try re-registering '})
    return p2
  }
}
const fetchPay=()=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/approved/'
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
    let p2 =Promise.resolve({qmessage:'you do not seem to be known on this device '})
    return p2
  }
}
const fetchAccrued=()=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/accrued/'
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
    let p2 =Promise.resolve({qmessage:'you do not seem to be known on this device '})
    return p2
  }
}
const fetchCurrent=()=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/persons/current/'
    let options= {headers: {'Authorization': 'Bearer '+ lsh['token']}}
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          console.log('json: ', json)
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
    let p2 =Promise.resolve({qmessage:'you do not seem to be known on this device '})
    return p2
  }
}
const postPay=(persons,wk)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/persons/post/'+wk
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({persons:persons})
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

const postJobRates=(jcrates)=>{
  console.log('jcrates: ', jcrates)
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/jc/'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({jcrates:jcrates})
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

const postJournal=(jplus)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/gl/'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(jplus)
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

const postPayment=(jor)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/gl/'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(jor)
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>json)
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}


const putPay=(person)=>{
  console.log('person: ', person)
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/persons/update'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({person:person})
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
const putCk=(person)=>{
  const personobjstr =JSON.stringify({person:person})
  console.log('personobjstr: ', JSON.parse(personobjstr))
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/persons/ck'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: personobjstr
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

const putBid=(bid)=>{
  const bidstr =JSON.stringify(bid)
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/bid'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: bidstr
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

const newPay=(person)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/persons/new'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({persons:person})
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
const deletePay=(person)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/persons/del'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({person:person})
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

const fetchTaxes=(year)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/taxes/'+year
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          return json
        })
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

const fetchPayments=(year)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/payments/'+year
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          return json
        })
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

const fetchJobCosts=(year)=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/jobcosts/'+year
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          return json
        })
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

const fetchBids=()=>{
  var lsh = ls.getItem();
  if(geta('lsh.token', lsh)){
    let url= cfg.url.api+'/payroll/bids/'
    let options= {
      headers: {'Authorization': 'Bearer '+ lsh['token'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    }  
    return(
      fetch(url, options)
        .then((response)=>response.json())
        .then((json)=>{
          return json
        })
    )        
  }else{
    let p2 =Promise.resolve({qmessage:'you dont exist! '})
    return p2
  }
}

export{fetchSettings, fetchPay, fetchAccrued, postPay, putPay, newPay, deletePay, putCk, fetchCurrent, fetchRates, fetchTaxes, fetchPayments, fetchJobCosts, postJobRates, postJournal, postPayment, putBid, fetchBids, fetchState}

