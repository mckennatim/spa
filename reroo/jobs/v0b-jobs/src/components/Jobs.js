import React from 'react'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchJobs} from '../services/fetches'
import {pStyle} from '../styles'
import 'w3-css/w3.css';
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
  componentDidMount(){
    this.getJobs(0)
  }  
  getJobs(){
    console.log('dog')
    fetchJobs()     
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

  sav2wk = ()=>{

  }
  sav = () =>{

  }
  
  render(){
    const{jobs,filt}=this.state
    console.log(this.state);
    
    return(
      <div style={style.outer}>
        <span> {filt}
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
                {ajob.idx}. {ajob.job} </div>
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
  }
}
Jobs = mapClass2Element(Jobs)

export {Jobs}
