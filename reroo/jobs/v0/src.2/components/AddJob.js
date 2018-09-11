import React from 'react';
import {router} from '../app'
import {mapClass2Element} from '../hoc/mapClass2Element'
import Form from 'muicss/lib/react/form';// eslint-disable-line 
import Input from 'muicss/lib/react/input';// eslint-disable-line 
import Textarea from 'muicss/lib/react/textarea';// eslint-disable-line 
import Button from 'muicss/lib/react/button';// eslint-disable-line 
import {pStyle} from '../styles'
import { putJob, deleteJob } from '../services/fetches';
import {cfg} from '../utilities/getCfg'

console.log(cfg);

const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#CCCCCC'}
}
//pStyle.outer.background='#C4A265'

class AddJob extends React.Component {
  state = {ejob:this.props.ejob}

  componentDidMount() {
    console.log(this.props);
    this.setState({ejob:this.props.ejob})
  }

  updateJob=(e)=>{
    e.preventDefault()
    console.log(this.state.ejob);
    const cs=this.state.ejob.categories.replace(/\s/g, "").split(',')
    console.log(cs);
    const job = this.state.ejob.job
    const idx = this.state.ejob.idx
    const active = this.state.ejob.active
    const coid = this.state.ejob.coid
    const nca = cs.map((c)=>{
      return {job:job, category:c, idx:idx, active:active, week:0, coid:coid}
    })
    console.log(nca);
    putJob(nca)
    router.navigate('/jobs');
  }
  jobChanged =(e)=>{
    console.log('editchanged ', e.target.value);
    let ejob= this.state.ejob
    ejob.job = e.target.value
    ejob.idx = 0
    ejob.active = 0
    ejob.coid = cfg.coid
    this.setState({ejob:ejob}, ()=>console.log(this.state.ejob));
  }
  catChanged =(e)=>{
    console.log('editchanged ', e.target.value);
    let ejob= this.state.ejob
    console.log(ejob.categories);
    
    ejob.categories = e.target.value
    this.setState({ejob:ejob}, ()=>console.log(this.state.ejob));
  }
  delJob=()=>{
    console.log(this.state.ejob.job);
    deleteJob(this.state.ejob.job)
    router.navigate('/jobs');
  }
  render() { 
    return (
      <div style={style.outer}>
      <Form>
        <legend>Add or Update Job</legend>
        <Input placeholder="Job" value={this.state.ejob.job} onChange={this.jobChanged}/>
        <Input placeholder="Categories- comma separated or null" value={this.state.ejob.categories} onChange={this.catChanged}/>
        <Button variant="raised" onClick={this.updateJob}>update</Button>
        <Button onClick={this.delJob}>delete</Button>
      </Form>

      </div>
      );
  }
}
AddJob = mapClass2Element(AddJob)

export {AddJob};