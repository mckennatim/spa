import React from 'react'// eslint-disable-line no-unused-vars
//import {mapClass2Element} from '../hoc/mapClass2Element'
var moment = require('moment');

import{fetchJobCosts} from '../services/fetches'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';// eslint-disable-line no-unused-vars
import FormControl from '@material-ui/core/FormControl';// eslint-disable-line no-unused-vars
import Select from '@material-ui/core/Select';// eslint-disable-line no-unused-vars
import MenuItem from '@material-ui/core/MenuItem';// eslint-disable-line no-unused-vars
import ExpansionPanel from '@material-ui/core/ExpansionPanel';// eslint-disable-line no-unused-vars
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';// eslint-disable-line no-unused-vars
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';// eslint-disable-line no-unused-vars
import FormHelperText from '@material-ui/core/FormHelperText';// eslint-disable-line no-unused-vars
import Typography from '@material-ui/core/Typography';// eslint-disable-line no-unused-vars
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';// eslint-disable-line no-unused-vars
import Table from '@material-ui/core/Table';// eslint-disable-line no-unused-vars 
import TableBody from '@material-ui/core/TableBody';// eslint-disable-line no-unused-vars
import TableCell from '@material-ui/core/TableCell';// eslint-disable-line no-unused-vars
import TableRow from '@material-ui/core/TableRow';// eslint-disable-line no-unused-vars
import TableHead from '@material-ui/core/TableHead';// eslint-disable-line no-unused-vars
import Paper from '@material-ui/core/Paper';// eslint-disable-line no-unused-vars
import {drnd} from '../utilities/getCfg'

const styles = theme => ({
  troot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
});


class JobCosts extends React.Component{
  state={year:''}

  active='mabibi'
 
  componentDidMount=()=>{
    const cyr = moment().format('YYYY')*1
    const yrarr =[]
    for(var i =-2; i <= 3; i++){
      yrarr.push(cyr+i)
    }
    this.setState({yrarr})
  }  
  getReport=(year)=>{
    console.log('yr', year)
    fetchJobCosts(year)
      .then((json)=>{
        if(json.qmessage){
          console.log('json.qmessage: ', json.qmessage)
        }else{
          const{results}=json
          this.setState({byjob:results[0],byjobcat:results[1],byworker:results[2]},()=>{console.log('this.state: ', this.state)})
        }
      })    
  }

  handleYearChange=(e)=>{
    console.log('e.target.name: ', e.target.name)
    const val = e.target.value
    this.setState({year: e.target.value}, this.getReport(val))
  }

  ckIfYr =()=>{
    console.log('in ckifyr')
  }

  selectJob=(m,i)=>()=>{
    console.log('m,i: ', m,i)
  }

  renderByJob=()=>{
    // const { classes } = this.props;
    const{byjob}=this.state
    if(byjob){
      return(
        <ul style={style.list.ul}>
          {byjob.map((m, i)=>{
            return (
            <li style={style.list.li} key={i}>
              <div onClick={this.selectJob(m,i)}>{m.job}   
                <div style={style.list.rt}>
                  cost.: {m.cost.toFixed(2)} <br/> 
                  hours: {m.hrs.toFixed(1)} <br/> 
                  cost/hr: {drnd(m.hrcost)}
                </div> 
              </div> 
            </li>
            )
          })}
        </ul>
      )
    }else{
      return(
        <div>no data</div>
      )
    }
  }  

  renderByJobCat=()=>{
    // const { classes } = this.props;
    const{byjob}=this.state
    if(byjob){
      return(
        <ul style={style.list.ul}>
          {byjob.map((m, i)=>{
            const jobcat = m.job+ (m.cat==undefined ? '': '-'+ m.cat)
            return (
            <li style={style.list.li} key={i}>
              <div onClick={this.selectJob(m,i)}>{jobcat}   
                <div style={style.list.rt}>
                  cost.: {m.cost.toFixed(2)} <br/> 
                  hours: {m.hrs.toFixed(1)} <br/> 
                  cost/hr: {drnd(m.hrcost)}
                </div> 
              </div> 
            </li>
            )
          })}
        </ul>
      )
    }else{
      return(
        <div>no data</div>
      )
    }
  } 

  renderByWorker=()=>{
    // const { classes } = this.props;
    const{byjob}=this.state
    if(byjob){
      return(
        <ul style={style.list.ul}>
          {byjob.map((m, i)=>{
            const jobcat = m.job+ (m.cat==undefined ? '': '-'+ m.cat)
            const descr = `m.someid`
            return (
            <li style={style.list.li} key={i}>
              <div onClick={this.selectJob(m,i)}>{jobcat}   
                <div style={style.list.rt}>
                  cost.: {m.cost.toFixed(2)} <br/> 
                  hours: {m.hrs.toFixed(1)} <br/> 
                  cost/hr: {drnd(m.hrcost)}
                </div> 
              </div> 
            </li>
            )
          })}
        </ul>
      )
    }else{
      return(
        <div>no data</div>
      )
    }
  } 
   
  render=()=>{
    const { classes } = this.props;
    const{yrarr}=this.state
    const rbyjob =this.renderByJob() 
    const rbyjobcat =this.renderByJobCat() 
    if (yrarr){
      return(
        <div>
          <h4> Reports on Job Costs </h4>
          <form >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Year</InputLabel>
            <Select
              value={this.state.year}
              onChange={this.handleYearChange}
              inputProps={{
                name: 'year',
                id: 'age-simple',
              }}
            > 
              {yrarr.map((yr,i)=>
                <MenuItem key={i} value={yr}>{yr}</MenuItem>
                )}
            </Select>
          </FormControl>
          </form>
          <ExpansionPanel onClick={this.ckIfYr}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>By Job</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {rbyjob}
                
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>By Category</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {rbyjobcat}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>By Worker</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </ExpansionPanelDetails>
          </ExpansionPanel>          
        </div>
      )
    }else{
      return(
        <div>
          <h2>huh duh</h2>
        </div>
      )
    }
  }
}
JobCosts = withStyles(styles)(JobCosts)

export {JobCosts}

const style = {
  he:{
    overflow:'hidden',
    margin: '2px 10px 10px 10px',
   padding: '4px',
    background: '#C4A265'
  },
  list:{
    ul:{ 
      listStyleType: 'none',
      display: 'flex',
      flexDirection: 'column'
    },
    li:{
      
      paddingTop: '8px',
      borderBottom: '1px solid',
      width: '200px',
      flex:1
    },
    rt:{
      float:'right',
      textAlign:'right'
    }
  }
}