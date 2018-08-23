import React from 'react'// eslint-disable-line no-unused-vars
import {router} from '../app'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchJobs, postJobs} from '../services/fetches'
import {pStyle} from '../styles'
import { setEdit } from '../actions/jobacts';
const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

const myli ={
  od:{
    overflowY: 'auto',
    height: '350px',
    border: '1px solid #ccc'
  },
  ul:{
    textAlign: 'left',
    listStyleType: 'none',
    paddingLeft: '12px'
  },
  li:{
    overflow: 'hidden',
    border: 'solid 1px black'
  },
  job:{
    width: '70%',
    float: 'left',
    background: 'yellow'
  },
  cat:{
    width: '20%',
    float: 'left',
    background: 'white'

  },
  act:{
    width: '10%',
    float: 'right',
    background: 'orange'

  }
}

class Jobs extends React.Component{
  Jobs='mabibi sufvhs'
  state={
    jobs: [{job: 'duck', id: 99}],
    wk: 0,
    filt: 'all'
  }

  dwk=null

  componentDidMount(){
    this.getJobs(0)
    this.dwk = document.getElementById("wk")
  }  
  getJobs(){
    console.log('dog')
    fetchJobs(0)     
      .then((res)=>{
        console.log(res.jobs)
        this.setState({jobs: res.jobs},()=>{})
      })
  }

  onChecked=(a)=>{
    let njobs = this.state.jobs.map((job)=>{
      if (job.id==a.id){
        job.active = !job.active
      }
      return job
    })
    console.log(njobs);
    console.log('ON LINE 73');
    this.setState({jobs:njobs})
    console.log(a)
  }

  filtAct = ()=>this.setState({filt:'active'});
  filtInAct = ()=>this.setState({filt:'inactive'});
  filtAll = ()=>this.setState({filt:'all'});
  
  
  fact = (job)=>job.active==true
  finact = (job)=>job.active==false
  fall = ()=>true

  fil = (job)=>{
    switch (this.state.filt) {
      case 'all':
        return this.fall(job) 
      case 'active':
        return this.fact(job) 
      case 'inactive':
        return this.finact(job) 
      default:
        return this.fall()
    }
  }
  getwk = ()=>{
    let wk = this.dwk.value.split('W')[1];
    wk===undefined ? wk=0 : wk
    console.log(wk);  
    fetchJobs(wk)
    .then((res)=>{
      console.log(res.jobs)
      this.setState({jobs: res.jobs},()=>{})
    })    
  }
  sav2wk = ()=>{
    let wk = this.dwk.value.split('W')[1];
    if(wk===undefined){
      window.alert('please select a week')
      return
    } 
    console.log(wk);
    const jobs = this.state.jobs
      .filter((j)=>j.active)
      .map((j)=>{return {job: j.job, category: j.category,   active: j.active*1, idx: j.idx, week:wk, coid:j.coid}})
    postJobs(jobs, wk)  
  }
  sav = () =>{
    const jobs = this.state.jobs.map((j)=>{return {job: j.job, category: j.category,   active: j.active*1, idx: j.idx, week:0, coid:j.coid}})
    postJobs(jobs, 0)
  }

  editJob=(j)=>{
    let jo = {job:j.job, active:j.active, idx:j.idx, coid:j.coid}
    let ar = []
    this.state.jobs
      .filter((job)=>job.idx==j.idx)
      .map((ji)=>ar.push(ji.category))
    jo.categories = ar.join(', ')
    setEdit(jo)
    router.navigate('/addjob');
  }
  
  render(){
    const{jobs,filt}=this.state
    console.log(this.state);
    if (jobs){


      return(
        <div style={style.outer}>
          <span> {filt}
          <button onClick={this.getwk}>getwk</button>
          <input id="wk" type="week" size="1"/>
          <button onClick={this.sav2wk}>sav2wk</button>
          <button onClick={this.sav}>save</button>
          <button onClick={this.filtAct}>active</button>
          <button onClick={this.filtInAct}>inact</button>
          <button onClick={this.filtAll}>all</button>
          </span>
          <div style={myli.od}> 
            <ul style={myli.ul}>
            {jobs
              .filter((ajob)=>this.fil(ajob))
              .map((ajob)=>{
              return (
              <li  key={ajob.id} style={myli.li}>
                <div style={myli.job}> 
                  <span onClick={this.editJob.bind(null, ajob)}>{ajob.idx}</span>. {ajob.job} </div>
                <div style={myli.cat}>
                  {ajob.category}</div>
                <div style={myli.act}>
                  <input type="checkbox" checked= {ajob.active} onChange={this.onChecked.bind(null, ajob)}></input>
                  </div>
              </li >)
            })}
            </ul>
          </div>
        </div>
      )
    }else{
      return(
        <div>
          <a href="home" data-navigo>maybe you need to register</a>
        </div>
        )
    }
  }
}
Jobs = mapClass2Element(Jobs)

export {Jobs}
