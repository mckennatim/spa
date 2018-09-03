import React from 'react'

class JobCost extends React.Component {
  state={showjobs:false, showon:null, hrsleft:0}



  showJobs = ()=>{
    console.log('showing jobs: ')
    console.log('this.props.jobs: ', this.props.jobs)
    this.setState({showjobs:true})
  }

  addSome=(e)=>{
    this.setState({hrsleft: this.props.puhrs-this.props.jchrs})
    console.log('adding: ', e.target.getAttribute('ix'))
    this.setState({showon:e.target.getAttribute('ix')})
  }

  add4day=(e)=>{
    this.setState({hrsleft:e.target.value})
  }

  inpKey =(e)=>{
    console.log('event: ', e.keyCode)
    if(e.keyCode==13){
      const val = e.target.value
      const idx = e.target.parentElement.getAttribute('ix')
      const nj ={...this.props.jobs[idx]}
      nj.hrs=val*1
      console.log('this.props.jcost: ', JSON.stringify(this.props.jcost))
      console.log('this.props.jcost: ', this.props.jcost)
      const njcost = this.modifyJcost(nj) 
      this.props.jcChanges(njcost)
      console.log('njcost: ', JSON.stringify(njcost))
      this.setState({showjobs:false, showon:null})
    }
  }

  modifyJcost =(nj)=>{
    const njcost = this.props.jcost.slice()
    const idx = njcost.findIndex((j)=>j.job+j.cat==nj.job+nj.category)
    if(idx>-1){
      const nejcost = {...njcost[idx]}
      nejcost.hrs=Math.round((nejcost.hrs+nj.hrs)*100)/100
      njcost[idx]=nejcost
    }else{
      njcost.push({job:nj.job, cat:nj.category, hrs:nj.hrs})
    }
    return njcost
  }

  renderInput = ()=>{
    return(
      <input style={style.jchr} type="number" value={this.state.hrsleft} onChange={this.add4day} step=".25" max="4.1" onKeyUp={this.inpKey}/>
    )
  }
  renderList =()=>{
    const aninput =this.renderInput()
    if(this.state.showjobs){
      const jl = this.props.jobs.map((j,i)=>{
        if(i==this.state.showon){
          return (
            <li key={i}>{j.job}{j.category} 
            <span ix={i}> {aninput}</span>
            </li>
          )
        }else {
          return (
            <li key={i}>{j.job}{j.category} 
            <span ix={i} onClick={this.addSome}> add </span>
            </li>
          )
        }
      })
      return(
        <ul>{jl}</ul>
      )
    }
  }

  renderJcost =(jcost)=>{
    const jca = jcost.map((jc,i)=>{
      return (
      <div key={i}> 
        <span>{jc.job} {jc.cat} {jc.hrs}</span><br/>
      </div>
      )
    })
    return jca
  }

  render() {
    console.log('rendering JobCost')
    const {showjobs}=this.state// eslint-disable-line no-unused-vars
    const {jchrs, jcost, puhrs}= this.props 
    const jcosts = this.renderJcost(jcost)
    const jlist = this.renderList()
    const jcbox = this.alterJcbox()
    return ( 
      <div style={jcbox}>
        <span onClick={this.showJobs}> + </span>
        <span>job costs  {puhrs} - {jchrs} = {Math.round((puhrs-jchrs)*100)/100}</span><br/>
        {jlist}   
        {jcosts}

      </div>
    );
  }

  alterJcbox=()=>{
    const nstyle = {...style}
    const njcbox ={...nstyle.jcbox}
    nstyle.jcbox = njcbox
    if (this.props.puhrs-this.props.jchrs<=0){
      nstyle.jcbox.background = 'green'
    }
    return nstyle.jcbox
  }
}
 
export {JobCost};

const style={
  jcbox:{
    border: '1px solid green',
    background: 'yellow'
  },
  jchr:{
    width: '50px'
  }
}