import React from 'react'
import {router} from '../app'
import {App} from './App'
import {Admin} from './Admin'
import {Super} from './Super'
import {Nav} from './Nav'
import {Dog} from './Dog'
import {Devices} from './Devices'
import {DevicesApps} from './DevicesApps'
import {DevInf} from './DevInf'
import {SenRel} from './SenRel'
//import {DeviceForm} from './DeviceForm'
import {Registered} from './Registered'
import {Products} from './Products'
import {Verify} from './Verify'
import {VerifyList} from './VerifyList'
import {pStyle} from '../styles'
import {loadGithubFollowers} from '../actions';

//console.log(DeviceForm)

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

const Home = (props) =>{
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
//const multi=[] multi delared but empty defaults to single pane

const multi =[{pri:'About', mul:[
								['About', 'Products'],
								['Products', 'About', 'Home']]
							 },
							{pri:'Products', mul:[
								['Products', 'About'],
								['About', 'Products', 'Home']]
							 },
							{pri:'Dog', mul:[
								['Dog', 'Home'],
								['Dog', 'About', 'Home']]
							 },
							{pri:'Home', mul:[
								['Home', 'About'],
								['Dog', 'About', 'Home']]
							 },
							{pri:'DevInf', mul:[
								['DevInf', 'Devices'],
								['DevInf', 'Devices', 'Home']]
							 },
							{pri:'Devices', mul:[
								['Devices', 'DevInf'],
								['Devices', 'DevInf', 'About']]
							 }
							]

//['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop']
const panes= [1,1,2,2,3,3]

export {Admin, Super, About, Products, Verify, VerifyList, Home, Dog, Registered, Devices, DevicesApps, DevInf, SenRel, App, Nav, multi, panes}