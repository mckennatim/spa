import React from 'react'// eslint-disable-line no-unused-vars
import {router} from '../app'
import {pStyle} from '../styles'
import {Nav} from './Nav'// eslint-disable-line no-unused-vars
pStyle.outer.background='#C4A265'

const Home = () =>{

  function goAbout(){
    console.log("in home goAbout")
    router.navigate('about');
  }
  const style = {
    ...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
  }
  return(
    <div style={style.outer}>
      <Nav/>
      <h3> Home </h3>
      <button id="but" onClick={goAbout}>goto about</button>
    </div>
  )
}

export {Home}
