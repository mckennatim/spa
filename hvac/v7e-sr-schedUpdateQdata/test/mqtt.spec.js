import {expect} from 'chai';
import {ls} from '../src/utilities/getCfg'
import {createMqttStore, createBlankQdata, qdataAsArray, processMqttMessage} from '../src/services/interface'

localStorage.setItem('hvac', `{"email":"tim@sitebuilt.net","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imh2YWMiLCJlbWFpbCI6InRpbUBzaXRlYnVpbHQubmV0In0.e8oviN49uxjbc9FgcyPWV-vQYp0YlD183FhqCWzpuT0","cloc":"12ParleyVale","devs":{"CYURD003":[{"sr":0,"label":"kid"},{"sr":1,"label":"lr"}],"CYURD001":[{"sr":0,"label":"music"},{"sr":1,"label":"peri"}]},"zones":[{"id":"kid","name":"Kid's Suite","img":"kid.jpg"},{"id":"lr","name":"Living Room","img":"lr.jpg"},{"id":"music","name":"Music Room","img":"music.jpg"},{"id":"peri","name":"Peri's Study","img":"peri.jpg"}],"appid":"hvac"}`)

var statestr =  `
  {"devs":{
    "CYURD003":[{"sr":0,"label":"kid"},{"sr":1,"label":"lr"}],
    "CYURD001":[{"sr":0,"label":"music"},{"sr":1,"label":"peri"}]
  },
  "zones": [
    {"id":"kid","name":"Kid's Suite","img":"kid.jpg"},
    {"id":"lr","name":"Living Room","img":"lr.jpg"},
    {"id":"music","name":"Music Room","img":"music.jpg"},
    {"id":"peri","name":"Peri's Study","img":"peri.jpg"}
  ],
  "shoulda":"couda",
  "payload":{"topic":"CYURD003/srstate","payload":{"id":4,"darr":[0],"new":0}}}`

var qdata =  `{
    "kid": {
      "id":"kid",
      "name":""Kid's Suite",
      "img":"kid.jpg",
      "specs: {type": "temp", "diff": 2},
      "sr": {"temp": 44, "relay": 1, "setpt": 68,},
      "sched": [
        {time: "5:30", setpt: 68},
        {time: "10:30", setpt: 62},
        {time: "17:30", setpt: 68},
        {time: "22:30", setpt: 61},
      ],
      timeleft: 0
    "lr": {"id":"lr","name":"Living Room","img":"lr.jpg"},
    "music": {"id":"music","name":"Music Room","img":"music.jpg"},
    "peri": {"id":"peri","name":"Peri's Study","img":"peri.jpg"}

  }`




var state = JSON.parse(statestr)
console.log(state)

var email= ls.getKey('email')
var zones = ls.getKey('zones')
var devs = ls.getKey('devs')
var qdatab = {}
var payload = state.payload

describe('mqtt', ()=>{
  it('does nothing',(done)=>{
    console.log('doen nada')
    expect(true).to.equal(true);
    done()
  })
  it('tries createBlankData',(done)=>{
    qdatab= createBlankQdata(devs, zones)
    console.log(qdatab.peri)
    expect(qdatab.peri.img).to.equal('peri.jpg');
    done()
  })
  it('tries Object.entries(qdatab).map',(done)=>{
    console.log(qdatab)
    let d = Object.entries(qdatab).map( (res)=>{
      return(res[1])
    })
    console.log(d)
    expect(d[3].id).to.equal('peri');
    done()
  })
  it('tries qdataAsArray(qdatab).map',(done)=>{
    let d= qdataAsArray(qdatab).map( (res)=>res)
    expect(d[3].id).to.equal('peri');
    done()
   })
  it('tries processMqttMessage()',(done)=>{
    let message = {"topic":"any/ready","payload":{"ready":true}}
    let res = processMqttMessage(message, devs, qdatab)
    console.log(res)
    expect(res).to.equal('dog');
    done()
  })
            
    
})