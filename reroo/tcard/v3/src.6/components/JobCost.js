import React from 'react'

class JobCost extends React.Component {
  state = {  }

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
    const {jchrs, jcost}= this.props 
    const jcosts = this.renderJcost(jcost)
    return ( 
      <div style={style.jcbox}>
        <span>job costs {jchrs}</span><br/>
        {jcosts}
      </div>
    );
  }
}
 
export {JobCost};

const style={
  jcbox:{
    border: '1px solid green'
  }
}