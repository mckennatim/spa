import React from 'react'// eslint-disable-line no-unused-vars
// import {mapClass2Element} from '../hoc/mapClass2Element'
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
import {drnd} from '../utilities/getCfg'

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
class Taxes extends React.Component{
  state = {year:"", month:"", curmo:{}, gov:'Fed'}
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
    const curmo = {cmo:'', paid:0.000, accrued:0.000}
    this.setState({yrarr, curmo, now, cmo},()=>console.log('this.state: ', this.state))
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
    const{fmobyqtr, cmo}=this.state
    let showmox,qmo
    switch (e.target.value) {
      case 'month':
        let curmo ={...this.state.curmo}
        console.log('curmo: ', curmo)
        const thmo = fmobyqtr.filter((m)=>{
          console.log('m: ', m, curmo.cmo)
          return m.mo==cmo
        })
        console.log('thmo: ', thmo)
        curmo.paid = thmo[0].paid
        curmo.accrued =thmo[0].accrued
        curmo.month = thmo[0].month
        curmo.cmo = thmo[0].mo
        showmox='but'
        if(curmo.accrued-curmo.paid<=0){
          showmox='none'
        }
        this.setState({curmo, showmox})
        break;
        case 'year':
        this.setState({moarr: fmobyqtr, showmox: 'list'})
        console.log('in year')
        break
        case 'q1':
        qmo=fmobyqtr.filter((q)=>q.qtr==1)
        this.setState({moarr: qmo, showmox: 'list'})
        console.log('in year')
        break
        case 'q2':
        qmo=fmobyqtr.filter((q)=>q.qtr==2)
        this.setState({moarr: qmo, showmox: 'list'})
        console.log('in year')
        break
        case 'q3':
        qmo=fmobyqtr.filter((q)=>q.qtr==3)
        this.setState({moarr: qmo, showmox: 'list'})
        console.log('in year')
        break
        case 'q4':
        qmo=fmobyqtr.filter((q)=>q.qtr==4)
        this.setState({moarr: qmo, showmox: 'list'})
        console.log('in year')
        break
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
    console.log('this..fmo: ', this.state.fmobyqtr)
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
      const blentry={account:'', wdprt:mofo.ref, someid:someid, job:'fed', cat:'payment', date:dbpaydate, somenum: 0, debit:0, credit:0}
      const fmobyqtr= this.state.fmobyqtr.slice()
      console.log('fmobyqtr: ', fmobyqtr)
      console.log('fmobyqtr.findIndex((f)=>f.mo==mofo.mo): ', fmobyqtr.findIndex((f)=>f.mo==mofo.mo))
      console.log('mofo: ', mofo)
      fmobyqtr[fmobyqtr.findIndex((f)=>f.mo==mofo.mo)].paid=mofo.pay
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
      e ={...blentry}
      e.account ='a1010-cash'
      e.credit=mofo.pay
      journal.push(e)
      console.log('journal: ',ttot, mofo.pay, journal)
      postPayment({journal})
      .then((res)=>{
        console.log('res: ', res)
        this.setState({showmox:'none', fmobyqtr})
      })
    }
  }
  selectMo=(field)=>()=>{
    //console.log('field: ', field, idx) 
    const pay = field.accrued-field.paid
    let curmo ={...this.state.curmo} 
    curmo.paid = field.paid
    curmo.accrued =field.accrued
    curmo.month = field.month
    curmo.cmo = field.mo
    // const fmobyqtr= this.state.fmobyqtr.slice()
    // console.log('fmobyqtr: ', fmobyqtr)
    // console.log('fmobyqtr.findIndex((f)=>f.mo==field.mo): ', fmobyqtr.findIndex((f)=>f.mo==field.mo))
    // console.log('field: ', field)
    // fmobyqtr[fmobyqtr.findIndex((f)=>f.mo==field.mo)].paid=field.accrued-field.paid
    const mofo = {ref: '', mo: field.mo, month: field.month, pay:pay, paydate:this.state.now}
    this.setState({curmo, rmofo:true, showmox:'but', mofo},this.recordPayment())
  }

  switchGov=(e)=>{
    this.setState({gov:e.target.value})
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
    const{rmofo, showmox}=this.state
    if(showmox=='but'){
      return(
        <div>
           <Button 
             color="primary" 
             className={classes.button} 
             onClick={this.recordPayment}>
           Record Payment
           </Button>
           {rmofo && this.renderMoFo()}
       </div>       
     )
    }else if(showmox=='list'){
      const{moarr}=this.state
      return(
        <ul style={style.list.ul}>
          {moarr.map((m, i)=>{
            return (
            <li style={style.list.li} key={i}>
              <div onClick={this.selectMo(m,i)}>{m.month}   
                <div style={style.list.rt}>
                  accr.: {m.accrued.toFixed(2)} <br/> paid: {m.paid.toFixed(2)} <br/> 
                </div> 
              </div> 
            </li>
            )
          })}
        </ul>
      )
    }else{
      return(
        <div>nothing owed for this month</div>
      )
    }
  }

  render(){
    const { classes } = this.props;
    const{yrarr, curmo, gov}=this.state
    const mox = this.renderMoX()
    console.log('curmo: ', curmo)
    if (yrarr){
      return(
        <div>
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
                <InputLabel htmlFor="age-simple">Monthly {gov}  </InputLabel>
                
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
                <div style={{float:'right'}}>
                  <span>
                    <input checked={gov=='Fed'} id='f' type="radio" name='gov' value='Fed' 
                      onChange={this.switchGov} />
                    <label htmlFor="f">fed  </label>
                  </span>   
                  <span>
                    <input checked={gov=='State'} id='s' type="radio" name='gov' value='State' 
                      onChange={this.switchGov}/>
                    <label htmlFor="s">state </label>
                  </span>
                </div>
                <div style={{float:'right', width:'50%'}}>
                  Month: {this.state.curmo.month} <br/>
                  Accr.: {drnd(this.state.curmo.accrued)} <br/>
                  Paid: {drnd(this.state.curmo.paid)} 
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
Taxes = withStyles(styles)(Taxes)
//Taxes = mapClass2Element(Taxes)

export {Taxes}

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
      height:'40px',
      paddingTop: '8px',
      borderBottom: '1px solid',
      width: '170px',
      flex:1
    },
    rt:{
      float:'right',
      textAlign:'right'
    }
  }
}