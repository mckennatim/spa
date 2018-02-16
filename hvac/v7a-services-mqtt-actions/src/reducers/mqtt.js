function getIndex(d,c){
  return d.map((dev)=>dev.id).indexOf(c)
}

const mqtt=(state, action) =>{
  //console.log(action)
  switch (action.type) {
    case 'GET_LS_CURRENT_APPS':
      console.log(state.currentApps)
      if (state.currentApps.id != "no one"){
        return state
      }else {
        console.log(action.payload)
        //return state
        return {
          ...state, 
          currentApps: action.payload
        }
      }
    case 'APPS_LOADING':
      console.log('APPS_LOADING')
      return {
        ...state,
        appsLoaded: false
      }
    case 'APPS_LOADED':
      console.log('APPS_LOADED')
      return {
        ...state,
        currentApps: action.payload,
        appsLoaded: true,
      }
    case 'DISCONNECT':
      return {
        ...state,
        isConnected: false
      }
    case 'RECONNECT':
      return {
        ...state,
        shouldConnect: action.payload
      } 
    case 'SENREL_CHANGED':
      return state        
    case 'DEVINFO_CHANGED':
      // console.log(action.payload)
      return {
        ...state,
        currentDevId: action.payload.par.id,
        currentDev: state.devices[getIndex(state.devices, action.payload.par.id )]
      };      
    case 'TIMR_CHANGED':
      return {
        ...state,
        timr: action.payload
      }
    case 'FLAGS_CHANGED':
      return {
        ...state,
        flags: action.payload
      }
    case 'SRSTATE_CHANGED': 
      const ridx = action.payload.id;
      const newsr = state.srstate.slice()
      newsr[ridx]=action.payload        
      return {
        ...state, srstate: newsr
      }
    case 'SCHED_CHANGED':
      let devlist = state.devices.slice()
      const devicesCopy = devlist.map((dev)=>{
        if(dev.id == action.payload.devId){
          if(!dev.sched){
            let sched = []
            dev.sched = sched
          }
          dev.sched[action.payload.sched.id] = action.payload.sched
        }
        return dev
      })
      return {
        ...state, devices: devicesCopy
      }
    default:
      return state;
  }
}

export{mqtt}