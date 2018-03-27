import React from 'react'// eslint-disable-line no-unused-vars
import {App} from './App'
import {Home} from './Home'
import {LocList} from './LocList'
import {Login} from './Login'
import {Nav} from './Nav'
import {Dog} from './Dog'
import {Zones} from './Zones'
import {Zone} from './Zone'
import {SensorRelay} from './SensorRelay'
import {WeekSched} from './WeekSched'
import {SaveSched} from './SaveSched'
import {TimerCtl} from './TimerCtl'
import {Registered} from './Registered'
import {AtLoc} from './AtLoc'
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
// const multi=[] //multi delared but empty defaults to single pane

const multi =[
  {pri:'AtLoc', mul:[
    ['AtLoc', 'SensorRelay'],
    ['AtLoc', 'SensorRelay', 'Home'],
    ['AtLoc','SensorRelay', 'About', 'Home']]
  },
  {pri:'SensorRelay', mul:[
    ['AtLoc', 'SensorRelay'],
    ['AtLoc', 'SensorRelay', 'WeekSched'],
    ['AtLoc','SensorRelay', 'LocList', 'Home']]
  },
  {pri: 'WeekSched', mul:[
    ['WeekSched', 'SensorRelay'],
    ['WeekSched', 'SensorRelay', 'AtLoc'],
    ['WeekSched', 'SensorRelay', 'AtLoc', 'Loclist']
  ]}
]

//['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop']
const panes= [1,1,2,2,3,3,4]

export {LocList, Login, About, Home, Dog, Registered, App, Nav, Zones, Zone, SensorRelay, WeekSched, TimerCtl, SaveSched, AtLoc, multi, panes}
