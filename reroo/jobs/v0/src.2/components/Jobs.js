import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
import {router} from '../app'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchJobs, postJobs} from '../services/fetches'
import { setEdit } from '../actions/jobacts';


class Jobs extends React.Component{
  Jobs='mabibi sufvhs'
  state={
    jobs: [{job: 'duck', id: 99}],
    wk: 0,
    filt: 'all',
    week:moment().week()
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
  chwk=(e)=>{
    let val =e.target.value
    if(val>0 && val<=52){
      console.log('val: ', val)
    }
  }
  
  render(){
    const{jobs,filt,week}=this.state
    console.log(this.state);
    if (jobs){


      return(
        <div >
          <div style={style.he}>
            <span style={style.he.dsp}>
              <input type="number" defaultValue="2018" style={style.he.yr}/> 
              wk 
              <input type="number" value={week} onChange={this.chwk} style={style.he.wk}/> 
              starting on Mon 11/17
            </span><br/>
            <span> {filt}
            <button onClick={this.getwk}>getwk</button>
            <button onClick={this.sav2wk}>sav2wk</button>
            <button onClick={this.sav}>save</button>
            <button onClick={this.filtAct}>active</button>
            <button onClick={this.filtInAct}>inact</button>
            <button onClick={this.filtAll}>all</button>
            </span>
          </div>
          <div style={style.myli.od}> 
            <ul style={style.myli.ul}>
            {jobs
              .filter((ajob)=>this.fil(ajob))
              .map((ajob)=>{
              return (
              <li  key={ajob.id} style={style.myli.li}>
                <div style={style.myli.idx}>
                  <span style={style.myli.idxsp} onClick={this.editJob.bind(null, ajob)}><i style={style.myli.icon} className="material-icons">edit</i></span>   
                </div>
                <div style={style.myli.job}> 
                   {ajob.job} 
                </div>
                <div style={style.myli.cat}>
                  {ajob.category}</div>
                <div style={style.myli.act}>
                  <input style={style.myli.ck} type="checkbox" checked= {ajob.active} onChange={this.onChecked.bind(null, ajob)}></input>
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

const style = {
  he:{
    margin: '2px 10px 10px 10px',
    height:'70px',
    dsp:{
      padding: '1px 1px 10px 1px',
    },
    yr:{
      width: '45px',
      background: 'silver'
    },
    wk:{
      width:'36px',
      background: 'whitesmoke'
    }
  },
  myli :{
    od:{
      height: '350px',
      border: '1px solid #ccc'
    },
    ul:{
      textAlign: 'left',
      listStyleType: 'none',
      paddingLeft: '12px'
    },
    li:{
      background: '#99CCCC',
      padding: '6px',
      overflow: 'hidden',
      border: 'solid 1px black'
    },
    idx:{
      float: 'left',
      width: '7%',
      padding: '5px'
    },
    icon:{
      fontSize: '18px'
    },
    ck:{
      transform: 'scale(1.5)',
      msTransform: 'scale(1.5)',
      webkitTransform: 'scale(1.5)',
      padding: '10px',
      border: '2px solid black'
    },
    job:{
      padding: '3px',
      width: '50%',
      float: 'left',
      background: '#99CCCC'
    },
    cat:{
      padding: '3px',
      width: '20%',
      float: 'left',
      background: '#99CCCC'
  
    },
    act:{
      width: '10%',
      float: 'right',
      background: '#99CCCC'
  
    }
  }
}
