import React from 'react'// eslint-disable-line no-unused-vars
import {router} from '../app'
import {App} from './App'
import {Nav} from './Nav'
import {Dog} from './Dog'
import {Counter} from './Counter'
import {Btheme} from './Btheme'
import {Atheme} from './Atheme'
import {Unstated, AppContainer, CounterContainer} from './Unstated'
import {Products} from './Products'
import {Registered} from './Registered'
import {pStyle} from '../styles'
import {loadGithubFollowers} from '../actions/test';
import { Subscribe} from 'unstated';// eslint-disable-line no-unused-vars


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
    <Subscribe to={[AppContainer, CounterContainer]}>
    {(app, counter) => {
      return(
      <div style={style.outer}>
        <h3> About {counter.state.count} {app.state.amount}</h3>
        <button id="but" onClick={handleGetFollowers}>get github followers</button>
        { isLoading ?
          <p>Loading...</p> :
          "dog" }
        { renderFollowers(followers) }
      </div>
    )}}
    </Subscribe>
  )
}

const Home = () =>{
  function goprod(){
    console.log("in home goprod")
    router.navigate('/about');
  }
    const style = {
    ...pStyle, outer: {...pStyle.outer, background: '#CC66CC'}
  }
  return(
    <div style={style.outer}>
      <h3> Home </h3>
      <button id="but" onClick={goprod}>goto about</button>
    </div>
  )
}
// const multi=[] //multi delared but empty defaults to single pane

const multi =[{pri:'About', mul:[
                ['About', 'Products'],
                ['About', 'Products', 'Home'],
                ['About','Products', 'About', 'Home']]
               },
              {pri:'Products', mul:[
                ['Products', 'About'],
                ['Products', 'About', 'Home']]
               },
              {pri:'Unstated', mul:[
                ['Unstated', 'About'],
                ['Unstated', 'About', 'Home']]
               },
              {pri:'Atheme', mul:[
                ['Atheme', 'Dog'],
                ['Atheme', 'Dog', 'Home']]
               }
              ]

//['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop']
const panes= [1,1,2,2,3,3,4]

export {About, Products,Home, Dog, Counter, Atheme, Btheme, Unstated, App, Nav, Registered, multi, panes}
