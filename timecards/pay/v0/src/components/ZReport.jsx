import React from 'react'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchTaxes, postPayment} from '../services/fetches'
import InputLabel from '@material-ui/core/InputLabel';// eslint-disable-line no-unused-vars
import MenuItem from '@material-ui/core/MenuItem';// eslint-disable-line no-unused-vars
import FormControl from '@material-ui/core/FormControl';// eslint-disable-line no-unused-vars
import Select from '@material-ui/core/Select';// eslint-disable-line no-unused-vars
import ExpansionPanel from '@material-ui/core/ExpansionPanel';// eslint-disable-line no-unused-vars
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';// eslint-disable-line no-unused-vars
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';// eslint-disable-line no-unused-vars
import FormHelperText from '@material-ui/core/FormHelperText';// eslint-disable-line no-unused-vars
import Typography from '@material-ui/core/Typography';// eslint-disable-line no-unused-vars
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';// eslint-disable-line no-unused-vars
import Button from '@material-ui/core/Button';// eslint-disable-line no-unused-vars
import TextField from '@material-ui/core/TextField';// eslint-disable-line 


import { withStyles } from '@material-ui/core/styles';
var moment = require('moment');

const styles = theme => ({
  root: {
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
class Report extends React.Component{
  state = {year:"", month:"", curmo:{}}
  active='mabibi'
  componentDidMount(){
    const cyr = moment().format('YYYY')*1
    const cmo = moment().format('MM')-1
    const now= moment().format('MM/DD/YYYY')
    console.log('cyr: ', cyr)
    console.log('cmo: ', cmo-1)
    const yrarr =[]
    for(var i =-2; i <= 3; i++){
      yrarr.push(cyr+i)
    }
    const curmo = {cmo:cmo, paid:"xxx.00", accrued:"xxx.00"}
    this.setState({yrarr, curmo, now},()=>console.log('this.state: ', this.state))
  }  
  getReport=(year)=>{
    console.log(year)
    fetchTaxes(year)
      .then((json)=>{
        console.log('json: ', json)
        const{results, binfo}=json
        this.setState({acctsmo: results[0], numempl: results[1], acctsqtr: results[2], fmobyqtr: results[3], fqtrtot: results[4], smobyqtr: results[5], sqtrtot: results[6], coid:binfo.coid }, (()=>{
          console.log('this.state: ', this.state)
        }))
      })
  }

  handleYearChange=(e)=>{
    console.log('e.target.name: ', e.target.name)
    const val = e.target.value
    this.setState({year: e.target.value}, this.getReport(val))
  }

  handleMonthChange=(e)=>{
    console.log('e.target.name: ', e.target.name)
    console.log('e.target.value: ', e.target.value)
    this.setState({month:e.target.value})
    switch (e.target.value) {
      case 'month':
        const{fmobyqtr}=this.state
        let curmo ={...this.state.curmo}
        console.log('curmo: ', curmo)
        const thmo = fmobyqtr.filter((m)=>{
          console.log('m: ', m, curmo.cmo)
          return m.mo==curmo.cmo
        })
        console.log('thmo: ', thmo)
        curmo.paid = thmo[0].paid
        curmo.accrued =thmo[0].accrued
        curmo.month = thmo[0].month
        this.setState({curmo})
        break;
    
      default:
        break;
    }
  }
  txtChanged = field => e =>{
    console.log('txtChanged')
    console.log('field, e: ', field, e)
    const {mofo}=this.state
    mofo[field]=e.target.value
    this.setState({mofo})
    // let curperson= this.props.eperson.curperson
    // curperson[field] = e.target.value
    // this.props.xmitChange({curperson:curperson});
  }

  recordPayment=()=>{
    const{rmofo, mofo,acctsmo}=this.state
    if(!rmofo){
      const {cmo, paid, accrued, month}=this.state.curmo
      const blmofo = {ref: '', mo: cmo, month: month, pay:accrued-paid, paydate:this.state.now}
      this.setState({rmofo:true, mofo:blmofo})
    }else{
      console.log('mofo: ', mofo)
      const curmo= {...this.state.curmo}
      curmo.paid = mofo.pay
      this.setState({curmo})
      const someid=`paid: ${mofo.paydate}`
      const dbpaydate = moment(`${this.state.year}-${mofo.mo.toString().padStart(2,'0')}-01`, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD')
      console.log('dbpaydate: ', dbpaydate, someid)
      const blentry={account:'', wdprt:'', someid:someid, job:'fed', cat:'payment', date:dbpaydate, somenum: 0, debit:0, credit:0}
      let e
      const thaccts = acctsmo.filter((a)=>{
        return a.mo==curmo.cmo
      })
      console.log('thaccts: ', thaccts)
      let ttot= 0
      const journal = thaccts
        .filter((f)=>{
          return f.account=='a2010-SS' || f.account=='a2020-medi' ||f.account=='a2030-meda' || f.account == 'a2050-fedWh'
        })
        .map((m)=>{
          e ={...blentry}
          e.account =m.account
          e.debit=m.credit-m.debit
          ttot+=m.credit-m.debit
          return e
        })
      console.log('journal: ',ttot, mofo.pay, journal)
      postPayment({journal})
    }
  }

  renderMoFo = ()=>{
    const { classes } = this.props;
    const {mofo}=this.state
    return(
      <div>
        <TextField
          id="standard-name"
          label="Reference #"
          className={classes.textField}
          value={mofo.ref}
          onChange={this.txtChanged('ref')}
          margin="dense"
        /> 
        <TextField
          id="standard-name"
          label="Month"
          className={classes.textField}
          value={mofo.month}
          InputProps={{
            readOnly: true,
          }}
          margin="dense"
        /> 
        <TextField
          id="standard-name"
          label="Amount"
          className={classes.textField}
          value={mofo.pay}
          InputProps={{
            readOnly: true,
          }}
          margin="dense"
        />
        <TextField
          id="standard-name"
          label="Pay Date"
          className={classes.textField}
          value={mofo.paydate}
          onChange={this.txtChanged('paydate')}
          margin="dense"
        />
    </div>
    )
  }

  renderMoX=()=>{
    const { classes } = this.props;
    return(
       <div>
          <Button 
            color="primary" 
            className={classes.button} 
            onClick={this.recordPayment}>
          Record Payment
          </Button>
          {this.state.rmofo && this.renderMoFo()}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget.
      </div>       
    )
  }

  render(){
    const { classes } = this.props;
    const{yrarr, curmo}=this.state
    const {cmo,paid,accrued}=curmo
    const mox = this.renderMoX()
    console.log('curmo: ', curmo)
    if (yrarr){
      return(
        <div style={style.he}>
          <h4> Reports on Witholding and Tax Liabilities </h4>
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
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Monthly Fed  </InputLabel>
                
                <Select
                  value={this.state.month}
                  onChange={this.handleMonthChange}
                  inputProps={{
                    name: 'month',
                    id: 'age-simple',
                  }}
                > 
                  <MenuItem value={'month'}>{'last month'}</MenuItem>
                  <MenuItem value={'year'}>{'this year'}</MenuItem>
                  <MenuItem value={'q1'}>{'quarter 1'}</MenuItem>
                  <MenuItem value={'q2'}>{'quarter 2'}</MenuItem>
                  <MenuItem value={'q3'}>{'quarter 3'}</MenuItem>
                  <MenuItem value={'q4'}>{'quarter 4'}</MenuItem>
                </Select>
                <FormHelperText>Paid/Accrued</FormHelperText>
              </FormControl>
                <div style={{float:'right', width:'50%'}}>
                  Month: {this.state.curmo.cmo} <br/>
                  Paid: {this.state.curmo.paid} <br/>
                  Accrued: {this.state.curmo.accrued}
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {mox}
              
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Expansion Panel 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.
            </Typography>
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
Report = withStyles(styles)(Report)
Report = mapClass2Element(Report)

export {Report}

const style = {
  he:{
    overflow:'hidden',
    margin: '2px 10px 10px 10px',
    padding: '4px',
    background: '#C4A265'
  }
}