import jsenv from '../../envmy.json'
import env from '../../env.json'
import {storageLocal} from './storageLocal'

const cfg= env[jsenv.m||'local']

const ls = storageLocal(cfg.appid)

const testCfg =()=>{
  const cred = {"email":"mckenna.tim@gmail.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InNocm9vbSIsImVtYWlsIjoibWNrZW5uYS50aW1AZ21haWwuY29tIn0.1n8rVxF5G-78H0KnsyEYTlZhMC6wdMYeu5rVnpzLN3o"}
  let cloc= '12ParleyVale'
  ls.modItem('email', cred.email)
  ls.modItem('token', cred.token)
  ls.modItem('devs', cfg.devices)
  ls.modItem('cloc', cloc)
}
testCfg()

export{ls, cfg}