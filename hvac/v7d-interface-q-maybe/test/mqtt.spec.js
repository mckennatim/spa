import {expect} from 'chai';
import {fromMqtt} from '../src/services/fromMqtt'
import {ls} from '../src/utilities/getCfg'

localStorage.setItem('hvac', `{"email":"tim@sitebuilt.net","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6Imh2YWMiLCJlbWFpbCI6InRpbUBzaXRlYnVpbHQubmV0In0.e8oviN49uxjbc9FgcyPWV-vQYp0YlD183FhqCWzpuT0","cloc":"12ParleyVale","devs":{"CYURD003":[{"sr":0,"label":"kid"},{"sr":1,"label":"lr"}],"CYURD001":[{"sr":0,"label":"music"},{"sr":1,"label":"peri"}]},"zones":[{"id":"kid","name":"Kid's Suite","img":"kid.jpg"},{"id":"lr","name":"Living Room","img":"lr.jpg"},{"id":"music","name":"Music Room","img":"music.jpg"},{"id":"peri","name":"Peri's Study","img":"peri.jpg"}],"appid":"hvac"}`)

console.log(ls.getKey('email'))

describe('mqtt testing', ()=>{
  it('tries fromMqtt',(done)=>{
    const mqtt$ = fromMqtt()
    console.log(res)
    expect(res).to.equal('dog');
    done()
  })
})