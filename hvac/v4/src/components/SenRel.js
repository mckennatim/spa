import React from 'react';
import { reqSchedData, changeDevInfo, changeSenRel } from '../actions';

function SenRel(props){
  const {name, devId, sched, srId, timeLeft, params} = props

  //changeSenRel(params)

  function getTime(){
    if (timeLeft){
      return timeLeft[srId]
    }
  }
  function generateRows(){
    if(sched && sched.length>0){
      const arow = sched.map((asch, idx)=>{
        // console.log(asch)
        const cells = asch.map((as,i)=>{
          return <td key={i}>{as}</td>
        })
        return <tr key={idx}>{cells}</tr>
      })
      return arow
    }
  }
  function createTsched(){
    console.log('trying to create tsched')
    console.log(goby)
    if (goby.bypass){
      console.log(goby.data)
      return goby.data
    }else{
      if(sched && sched.length>0){
        const ts = sched.map((r,i)=>{
          let ob = {}
          let h = r[0]+''
          let m = r[1]+''
          ob.time = `${"00".substring(0, 2-h.length)+h}:${"00".substring(0, 2-m.length)+m}`
          if (r.length==3){
            ob.state=r[2]
            return ob
          }else {
            ob.hilimit=r[2]
            ob.diff=r[2]-r[3]
            return ob
          }
        })
        return ts 
      }else return []   
    }
  }
  function generateHeaders(){
    if(sched && sched.length>0){
      if (sched.length==3){
        return <tr><th>hour</th><th>minute</th><th>state</th></tr>
      } else {
        return <tr><th>hour</th><th>minute</th>
                <th>hilimit</th><th>lolimit</th></tr>
      }
    } 
  }
  // function handleCb(){
  //   console.log('in handleCb')
  // }


  const headerComponents = generateHeaders()
  const rowComponents = generateRows()
  const tleft = getTime()

  //const tsched = createTsched()
  return(
    <div>
      <div style={styles.outer} >
        <h4>in SenRel {name} device: {devId} senrel: {srId} </h4>
        {tleft}
        <div style={styles.tablediv}>
          <table style={styles.table}>
            <thead>{headerComponents}</thead>
            <tbody>{rowComponents}</tbody>                      
          </table>
        </div>        
        <Ached sche={createTsched()}/>
      </div>
    </div>
    )    
}

var goby = {
  data: {},
  bypass: false,
  doby: function(data){
    return data
  } 
} 

function mapStoreToProps(anElement){
  // console.log(goby)
  // if (goby.bypass){

  // }
  return (store)=>{
    function wait4sched(srId){
      if (store.mqtt.currentDev.sched && store.mqtt.currentDev.sched.length>srId){
        return store.mqtt.currentDev.sched[srId].pro
      }
    }
    const srId = store.mqtt.currentSenRel
    //console.log(store)
    const props= {
      params: store.responsive.page.params,
      name: store.test.name,
      devId: store.mqtt.currentDevId,
      srId: srId,
      sched: wait4sched(srId),
      timr: store.mqtt.timr,
      timeLeft: store.mqtt.timr.tIMElEFT
    }
    //console.log(props)
    return React.createElement(anElement, props)
  }
}
SenRel = mapStoreToProps(SenRel)
export {SenRel} 



function handleCb(x){
  console.log('in handle cb')
  // console.log(x)
  goby.data = x;
  goby.bypass = true;
  // console.log(goby)
}

function  Ached({sche}){
  var osc = sche.slice()
  var osc2
  function handle(e){
    osc[e.target.dataset.row][e.target.dataset.ke]=e.target.value
    osc2 = osc.slice()
    console.log(osc2)
    handleCb(osc2)
  }
  function createList(){
    if(osc && osc.length>0){
      const keys = Object.keys(osc[0])
      const headers= keys.map((h,i)=><th key={i}>{h}</th>)
      const rows = osc.map((r,i)=>{
        const k = keys.map((k,j)=>{
          // console.log(r[k])
          if (j==0){
            return(<td key={j}>
              <input data-row={i} data-ke={k} type="time" value={r[k]} onChange={handle}/>
              </td>)
          }else{
            return(<td key={j}>
              <input data-row={i} data-ke={k} type="number" value={r[k]} size="2" onChange={handle}/>
              </td>)
          }
        })
        return(<tr key={i}>{k}</tr>)
      })
      return(
        <div style={styles.tablediv}>
          <table style={styles.table}>
            <thead><tr>{headers}</tr></thead>
            <tbody>{rows}</tbody>                      
          </table>
        </div>
      )
    }
  }
  // console.log(osc)
  function createAction(){
    console.log(osc2)
  }

  var slist = createList()
  return(
    <div><h4>my dog is cold</h4>
    <button onClick={createAction}>upd</button>
    {slist}
    </div>
    )
}

const styles= {
  outer: {
    background:'#9338f4',
    height: 400,
    textAlign: 'center'    
  },
  inner: {
    margin: '0 auto',
    background: '#FFF28E',
    height: 340,
    color: 'red',
    textAlign: 'center',
    fontSize: '300%'
  },
  tablediv: {
    margin: '0 auto',
    background: '#8fd3ba',
    color: 'blue',
    textAlign: 'left',
    fontSize: '100%'
  },
  span: {
    float: 'right',
    paddingLeft: 15
  },
  ul: {
    margin: '0 auto',
    listStyleType: 'none',
    width: 160,
    padding: 35
  },
  table:{
    borderCollapse: 'collapse'
  }  
}