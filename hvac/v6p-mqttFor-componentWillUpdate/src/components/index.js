import React from 'react'// eslint-disable-line no-unused-vars
import {App} from './App'
import {Home} from './Home'
import {LocList} from './LocList'
import {Loc} from './Loc'
import {Login} from './Login'
import {Nav} from './Nav'
import {Dog} from './Dog'
import {Zones} from './Zones'
import {Zone} from './Zone'
import {SenRel} from './SenRel'
import {Registered} from './Registered'
import {pStyle} from '../styles'
import {loadGithubFollowers} from '../actions/responsive';

const About = (props) =>{
  const { isLoading, followers} = props.responsive;
  const style = {
    ...pStyle, outer: {...pStyle.outer, background: '#99CCCC'}
  }
  function handleGetFollowers(){
    console.log("in get github followers")
    loadGithubFollowers('mckennatim')
  }
  function renderFollowers(followers) {
    if (!followers) return;
    return (
      <ul>{ followers.map((follower, index) => <li key={index}>{follower}</li>) }</ul>
    );
  }
  return(
    <div style={style.outer}>
      <h3> About</h3>
      <button id="but" onClick={handleGetFollowers}>get github followers</button>
      { isLoading ?
        <p>Loading...</p> :
        "dog" }
      { renderFollowers(followers) }
    </div>
  )
}
const multi=[] //multi delared but empty defaults to single pane

// const multi =[{pri:'About', mul:[
//                 ['About', 'Products'],
//                 ['About', 'Products', 'Home'],
//                 ['About','Products', 'About', 'Home']]
//                },
//               ]

//['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop']
const panes= [1,1,2,2,3,3,4]

export {LocList, Loc, Login, About, Home, Dog, Registered, App, Nav, Zones, Zone, SenRel, multi, panes}
