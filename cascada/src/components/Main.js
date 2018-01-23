var React = require('react');
//var Yard = require('./Yard');
import {Yard2} from './Yard2.js'
import {stripQuery, ck4query, ck4token, cfg} from '../utilities'

var imgurl = 'img/bkg-water.png'
var mStyle = {
	li: {
		display: 'inline',
		padding: '10px'
	},
	ul: {
	},
  span:{
    color: 'yellow'
  },
  div: {
    height: 900, 
    background: 'green',
    backgroundImage: "url("+imgurl+")"
  }
};

//var user ={email:'anybody', token:''}
ck4query(cfg)
var user = ck4token()

const register = ()=>{
  console.log('in register')
  console.log(stripQuery())
  window.history.pushState("object or string", "Title", "/"+stripQuery() );
  console.log(cfg.soauth)
  console.log(encodeURIComponent(cfg.soauth))
  const url = cfg.soauth+"/spa/"+cfg.appid+"?apiURL="+encodeURIComponent(cfg.api)+"&cbPath="+encodeURIComponent(cfg.cbPath)
  console.log(url)
  var amess= 'The owner of the device may add you as a user. If they do, when you click to authenticate, you will be able to control these devices'
  alert(amess)
  window.location=url  
}



const Main = ()=>{
  return (
    <div style={mStyle.div}>
      <ul>
      <li style={mStyle.li}><span style={mStyle.span}> yard </span></li>
      <li style={mStyle.li} onClick={register}><span style={mStyle.span}> register </span></li>
      </ul>
      <div className="container">
        <Yard2 user={user}/>
      </div>
    </div>
  )
};


module.exports = Main;