import React from 'react'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class Home extends React.Component{
  state={wk:35}

  chwk =(e)=>{
    console.log('e.target.value: ', e.target.value)
    this.setState({wk: e.target.value},()=>console.log('this.state: ', this.state))
  }
  render (){
    const { name } = this.props;
	  console.log('frog');
    return(
      <div className="content item-default" style={style.outer} >
        <h4>in doHome {name} </h4>
        <input type="number" value={this.state.wk} onChange={this.chwk}/>
      </div>
    )
  }
}

export {Home}

class Day extends React.Component {
  state = {  }
  render() { 
    return (<div>dog</div>  );
  }
}
 
