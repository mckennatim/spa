import React from 'react'// eslint-disable-line no-unused-vars
import {parseQuery} from '../utilities/wfuncs'
import {ls, cfg} from '../utilities/getCfg'
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchCtoken} from '../../../../common/v0/src/services/fetches'
import {postUniCoid} from '../services/fetches'
import {setKeyVal} from '../actions/personacts';
import TextField from '@material-ui/core/TextField';// eslint-disable-line no-unused-vars
import Button from '@material-ui/core/Button';// eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 240,
  },
  textField300: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 240,
  },
  button: {
    margin: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class Registered extends React.Component {
  state = {newco:this.props.newco, newup:'update', showbut:false, errorcoid:''}
  myRef = React.createRef();

  componentDidMount() {
    this.setState({newco:this.props.newco})
    const query= this.props.cambio.page.params.query;
    var mobj = parseQuery(query)
    if (mobj.message){
      const message = decodeURI(mobj.message)
      this.setState({renderwhat: 'message', message: message })
    }else{
      let person = {...this.props.newco.person}
      person.emailid=mobj.email 
      person.role='partner'
      setKeyVal({person:person})
      const ttoken = decodeURI(mobj.token)
      this.setState({renderwhat: 'createcoid', cos:[], coid:'', ttoken:ttoken})
    }
    let tid = this.refs.coidref
    console.log('tid: ', tid)
  }

  clickCoid=(e)=>{
    const idx =e.target.getAttribute('idx')
    const co = this.state.cos[idx]
    this.getCtoken(this.state.token, co)
  }

  getCtoken=(token,co)=>{
    //console.log('this.props.ejob.task: ', this.props.ejob.task)
    fetchCtoken(token,co)
      .then((res)=>{
        console.log('res: ', res)
        const isPartner = res.role=='partner' ? true : false
        setKeyVal({role:res.role, emailid:res.binfo.emailid, isPartner:isPartner})
        ls.setItem({email: res.binfo.emailid, token:res.token})
        location.replace('#persons')
      })
  }  
  selectRender=(renderwhat)=>{
    switch (renderwhat) {
      case 'message':
        console.log('rendering message')
        return this.renderMessage()
      case 'coids':
        return this.renderCoids()
      case 'createcoid':
        return this.renderTryCoid()
      case 'nothing':
        return this.renderNothing()
      default:
        return (<h4>default</h4>);
    }
  }

  getCoidCk=()=>{
    const {newco,ttoken}=this.state
    const{coid}=newco.co
    const{emailid}=newco.person
    console.log('Math.floor(Date.now())+30*(24*60*60*1000): ', new Date(Math.floor(Date.now())+30*(24*60*60*1000)).toLocaleDateString())
    postUniCoid({emailid, coid},ttoken)
      .then((res)=>{
        console.log('res: ', res)
        if(res.result){
          console.log('res.token: ', res.token)
          ls.setItem({email:res.emailid, token:res.token})
        }
      })
  }

  ckIfFree=(coid)=>{
    if(/^[0-9]/.test(coid)){
      this.setState({errorcoid:'please start with a letter'})
    }else if(/[^A-Za-z0-9]+/g.test(coid)) {
      this.setState({errorcoid:'please avoid special chars'})
    }else if(/.{12,}/.test(coid)){
      this.setState({errorcoid:'please use less than 12 characters', showbut:false})
    }else if (coid.length>5 && !/.{12,}/.test(coid)){
      this.setState({errorcoid:'', showbut:true})
    }else{
      this.setState({errorcoid:'', showbut:false})
    }    
  }

  txtChanged = (newcoarr, field) => e =>{
    newcoarr.map((c)=>{
      let xx = this.props.newco[c]
      xx[field]=e.target.value
      this.ckIfFree(xx[field])
      this.props.xmitChange(c,xx);
    })
  }

  renderCkBut=(showbut)=>{
    const { classes } = this.props;
    if(showbut){
      const buttext = showbut ? 'Signup if coid is available' : ''
      return(
        <Button
        variant="contained" 
        color="primary" 
        className={classes.button} 
        onClick={this.getCoidCk}>
          {buttext}
        </Button>
      )
    }

  }

  renderTryCoid=()=>{
    const {coid} = this.state.newco.co
    const {emailid} = this.state.newco.person
    const { classes } = this.props;
    return(
      <div>
      <h4>Choose a Company ID</h4>
      <p>Enter a company id that starts with a letter and contains just letters and numbers, no spaces or special characters, at least 6 characters and less than 12. It just needs to be unique and identifiable by you, you won't need to remember it since your company is tied to your email id</p> 
      <TextField
        id="standard-disabled"
        label="Email Id"
        defaultValue={emailid}
        className={classes.textField}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        required
        id="standard-name"
        ref={this.myRef}
        label="Company Id"
        className={classes.textField}
        value={coid}
        helperText={this.state.errorcoid}
        error={this.state.errorcoid.length>0 ? true : false}
        onChange={this.txtChanged(['co'], 'coid')}
        margin="dense"
      /> 
      </div>
    )
  }

  renderNothing=()=>{
    return (
      <h1>nothing</h1>
    )
  }
  renderCoids=()=>{
    return(
      <div style={style.he}>
        <h4>You Are Registered  </h4>
        <span>You are registered on this app for multiple businesses. Select which on you want to be logged in at. This app will remeber your last business selection. To switch later, just <a href={cfg.url.authqry}>register</a> again then select another business</span>
        <h4>Select a business/org/entity </h4>
        <ul style={style.myli.ul}>
          {this.state.cos.map((co,i)=>(
            <li style={style.myli.li} key={i} idx={i} onClick={this.clickCoid}>{co.coid} as {co.role} </li>
          ))}
        </ul>
      </div>
    )
  }
  renderMessage=()=>{
    return(
      <div>
        <h1>message</h1>"
        <span>{this.state.message} <a href="https://timecards.sitebuilt.net">here</a> </span>
      </div>
    )
  }

  render() {
    const{renderwhat, showbut}=this.state 
    console.log('showbut: ', showbut)
    const renderthis = this.selectRender(renderwhat)
    const renderckbut =  this.renderCkBut(showbut)
    return (
      <div style={style.he}>
        {renderthis}
        {renderckbut}
        
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
    handleXmitChange=(c,xx)=>{
      let nstate  ={...this.state}
      let nprops = {...nstate.props}
      let newco = {...nprops.newco}
      newco[c] = xx
      nprops.newco = newco
      this.setState({props:nprops})
    }
    render() {
      return (
        <Comp {...this.props} {...this.state} xmitChange={this.handleXmitChange}/>
      )
    }
  }  
}
Registered.propTypes = {
  classes: PropTypes.object.isRequired,
};
Registered = withStyles(styles)(Registered)
Registered = mapClass2Element(chHOC(Registered))

export {Registered }

const style = {
  he:{
    overflow:'hidden',
    padding: '6px',
    margin: '2px 10px 10px 10px',
    yw:{
      padding: '1px 1px 10px 1px'
    },
    yr:{
      width: '45px',
      background: 'silver'
    },
    wk:{
      width:'36px',
      background: 'whitesmoke'
    },
    img:{
      
      float:'right',
      width: '30px'
    },
    act:{
      float: 'right'
    },
    get:{
      float:'left'
    },
    but:{
      ac:{
        margin: '4px',
        padding: '4px'
      },
      ia:{
        margin: '4px',
        padding: '4px'
      },
      al:{
        margin: '4px',
        padding: '4px'
      }
    },
  },
  myli :{
    od:{
      overflow:'hidden',
      width: '100%',
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
      WebkitTransform: 'scale(1.5)',
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

