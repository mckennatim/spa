import React from 'react';
import {router} from '../app'
import {mapClass2Element} from '../hoc/mapClass2Element'
import Form from 'muicss/lib/react/form';// eslint-disable-line 
import Input from 'muicss/lib/react/input';// eslint-disable-line 
import Button from 'muicss/lib/react/button';// eslint-disable-line 
import {pStyle} from '../styles'
import { putPerson, deletePerson } from '../services/fetches';
import {setKeyVal} from '../actions/personacts';


const style = {
  ...pStyle, outer: {...pStyle.outer, background: '#CCCCCC'}
}
//pStyle.outer.background='#C4A265'

class AddPerson extends React.Component {
  state = {eperson:this.props.eperson, newup:'update'}

  componentDidMount() {
    this.setState({eperson:this.props.eperson})
  }

  updatePerson=(e)=>{
    e.preventDefault()
    console.log('this.props.eperson.curperson: ', this.props.eperson.curperson)
    const cs=this.props.eperson.curperson.categories.replace(/\s/g, "").split(',')
    const curperson = {...this.props.eperson.curperson}
    delete curperson.categories
    curperson.week=0
    const newjcarr = cs.map((c)=>{
      const ncurperson = {...curperson}
      ncurperson.category=c
      return ncurperson
    })
    console.log('newjcarr: ', newjcarr)
      putPerson(newjcarr)
    router.navigate('/persons?rerender');
  }
  personChanged =(e)=>{
    let curperson= this.props.eperson.curperson
    curperson.person = e.target.value
    curperson.idx = 0
    curperson.active = 0
    curperson.week=0
    this.props.xmitChange({curperson:curperson});
  }
  catChanged =(e)=>{
    let curperson= this.props.eperson.curperson
    curperson.categories = e.target.value
    this.props.xmitChange({curperson:curperson});
  }
  delPerson=()=>{
    deletePerson(this.props.eperson.curperson.person)
    router.navigate('/persons?rerender');
  }

  render() { 
    const{curperson, update, clearjc}=this.props.eperson
    if(clearjc){
      setKeyVal({clearjc:false}) 
      const e = {target: {value:''}}
      this.personChanged(e)
      this.catChanged(e)
    }
    const newup = update ? 'udpate' : 'new'
    return (
      <div style={style.outer}>
      <Form>
        <legend>Add or Update Person</legend>
        <Input placeholder="Person" value={curperson.person} onChange={this.personChanged}/>
        <Input placeholder="Categories- comma separated or null" value={curperson.categories} onChange={this.catChanged}/>
        <Button variant="raised" onClick={this.updatePerson}>{newup}</Button>
        <Button onClick={this.delPerson}>delete</Button>
      </Form>

      </div>
      );
  }
}

let chHOC = (Comp) =>{// eslint-disable-line no-unused-vars
  return class PP extends React.Component {
    constructor (props){
      super(props);
    }
    state={}
    static getDerivedStateFromProps(props, state){// eslint-disable-line no-unused-vars
      return {props}
    }
    handleXmitChange=(curperson)=>{
      let nstate  ={...this.state}
      let nprops = {...nstate.props}
      let neperson = {...nprops.eperson}
      neperson.curperson = curperson
      nprops.eperson = neperson
      this.setState({props:nprops})
    }
    render() {
      return (
        <Comp {...this.props} {...this.state} xmitChange={this.handleXmitChange}/>
      )
    }
  }  
}

AddPerson = mapClass2Element(chHOC(AddPerson))


export {AddPerson}