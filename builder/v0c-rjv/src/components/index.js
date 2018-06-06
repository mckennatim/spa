import React from 'react'// eslint-disable-line no-unused-vars
import {App} from './App'
import {Home} from './Home'
import {Select} from './Select'
import {Nav} from './Nav'
import {Edit} from './Edit'
import {Rjv} from './Rjv'// eslint-disable-line no-unused-vars
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
// const multi=[] //multi delared but empty defaults to single pane

const multi =[
  {pri:'Select', mul:[
    ['Select', 'Home']]
  },
  {pri:'Edit', mul:[
    ['Select','Edit']
  ]}
]

//['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop']
const panes= [1,1,2,2,3,3,4]

export {About, Home, Registered, App, Nav, Select, Edit, Rjv, multi, panes}
