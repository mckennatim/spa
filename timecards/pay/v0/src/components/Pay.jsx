import React from 'react'// eslint-disable-line no-unused-vars
var moment = require('moment');
// import {router} from '../app'
import {mapClass2Element} from '../hoc/mapClass2Element'
// import {fetchPay, postPay, fetchSettings, fetchRates, postJobRates, postJournal} from '../services/fetches'
import {fetchPay, fetchRates, fetchAccrued, postJournal, postJobRates} from '../services/fetches'
// import{adjWdprtDn, padWk} from  '../../../../common/v0/src/utilities/reroo'
// import { setEdit, setKeyVal} from '../actions/personacts';
import { setKeyVal} from '../actions/personacts';
import {makeHref,drnd} from '../utilities/getCfg'
// import Checkbox from '@material-ui/core/Checkbox';// eslint-disable-line no-unused-vars
import jsPDF from 'jspdf'
require('jspdf-autotable');
// console.log('jsPDF: ', jsPDF)
import {ls} from '../utilities/getCfg'

class Pay extends React.Component{
  Pay='mabibi sufvhs'
  state={
    notpersons: [{person: 'duck', id: 99, effective:'2018-01-01T14:12'}],
    wk: moment().week(),
    yr: moment().format('YYYY'),
    dddMMDD:'',
    firstday: ls.getKey('firstday'),
    waiting: true
  }

  dwk=null

  componentDidMount(){
    //this.getSettings()
    //this.getRates()
    this.getAccrued()
    // this.dwk = document.getElementById("wk")
    // console.log('moment().format("YYY-MM-DD): ', moment().format("YYYY-MM-DD"))
  }  

  // getSettings=()=>{
  //   fetchSettings()     
  //     .then((res)=>{
  //       if (res.qmessage){
  //         console.log('res.qmessage: ', res.qmessage)
  //         this.setState({qmessage:res.qmessage})
  //        // window.alert(res.qmessage)
  //       }else{
  //         console.log('res: ', res)
  //         console.log('JSON.parse(res.ot): ', JSON.parse(res.ot))
  //         // this.setState({firstday: res.firstday},()=>{
  //         //   setKeyVal({coid: res.coid, qmessage:res.qmessage, task:'pay',ot:JSON.parse(res.ot), firstday:res.firstday, wcrate:res.wcrate, stuirate:res.stuirate})
  //         // })
  //         this.setState({cosr:res, firstday: res.firstday},()=>{
  //           setKeyVal({coid: res.coid, qmessage:res.qmessage, task:'pay', ot:{}, firstday:res.firstday, wcrate:res.wcrate, stuirate:res.stuirate})
  //           console.log('this.state: ', this.state)
  //         })
  //       }
  //     })
  // }
  getAccrued=()=>{
    fetchAccrued()
    .then((res)=>{
      console.log('res: ', res)
      this.setState({accrued:res}, ()=>{
        this.getPay()
        console.log(this.lookupAccrued('mckenn.tim@gmail.com', 'a2010-S'))
      })
    })
  }

  getPay=()=>{
    fetchPay()
    .then((res)=>{
      const isPartner = res.binfo.role=='partner' ? true : false
      setKeyVal({role:res.binfo.role, emailid:res.binfo.emailid, isPartner:isPartner})
      this.setState({persons: res.persons},()=>this.getRates())
    })    
  }

  getRates=()=>{
    fetchRates()     
      .then((res)=>{
        if (res.qmessage){
          window.alert(res.qmessage)
        }else{
          this.setState({rates:res},()=>this.calcGross())
        }
      })
  }  

  calcPaydate = (wprt)=>{
    const{firstday}=this.state
    let wdprt = wprt+'-'+firstday
    console.log('wdprt: ', wdprt)
    if (firstday!=1 && wdprt.slice(-1)>=firstday){
      wdprt= moment(wdprt).subtract(7, "days").format("YYYY-[W]WW-E")
      console.log('wdprt: ', wdprt)
    }
    let paydate = moment(wdprt).add(7, "days").format("YYYY-MM-DD")
    console.log('paydate: ', paydate)
    return paydate
  }
 
  calcGross =() =>{
    const {persons, rates} = this.state
    const{cosr}=rates
    let{otrate, sarate, surate}=cosr
    otrate = otrate<1 ? 1 : otrate
    sarate = sarate<1 ? 1 :sarate
    surate =surate<1 ? 1 : surate
    const np = persons.map((p)=>{
      p.paydate=this.calcPaydate(p.wprt)
      let hrs = p.hrs
      
      const hrsarr = JSON.parse(p.hrsarr)
      let mfhrs = hrsarr.slice(0,5).reduce((t,h)=>t+h,0)
      let sah = hrsarr[5]
      let suh = hrsarr[6]
      let saot=0, suot=0 ,mfot=0, reg=0, aot=0, gross=0,grossAP=0
      if(sah>0){
        if(cosr.sarate>1){
          saot = (sarate-1)*sah*p.rate
        }else{
          mfhrs = mfhrs+sah
        }
      }
      if(suh>0){
        if(surate>1){
          suot = (surate-1)*suh*p.rate
        }else{
          mfhrs = mfhrs+suh
        }
      }
      if(otrate>1 && mfhrs>40 ){
        mfot = (otrate-1)*(mfhrs-40)*p.rate
      }
      console.log('mfhrs: ', mfhrs)
      reg = hrs*p.rate
      aot = saot+suot+mfot
      gross=reg+aot
      if (p.weeklybase && p.weeklybase>0){
        if (gross > p.weeklybase && p.wtype=='base'){
          grossAP = gross - p.weeklybase
          gross = p.weeklybase
        }
      }
      let mff = mfhrs<=40 ? 1 : ((p.rate*mfhrs+(mfhrs-40)*p.rate*(otrate-1))/mfhrs)/p.rate
      let saf = saot>0 ? sarate : mff
      let suf = suot>0 ? surate :mff
      let mfperhr = drnd(mfhrs<=40 ? p.rate : (p.rate*mfhrs+(mfhrs-40)*p.rate*(otrate-1))/mfhrs)
      let saperhr = drnd(saf*p.rate)
      let superhr = drnd(suf*p.rate)
      const regot = {reg:reg, mfot:mfot, gross:gross, grossAP: grossAP, saot:saot, suot:suot, mff:mff, saf:saf, suf:suf, mfrate:mfperhr, sarate:saperhr, surate:superhr}
      return {...p, regot}
    })
    this.setState({persons:np},()=>this.calcDeductions())
  } 

  calcDeductions =()=>{
    const{persons} = this.state
    const dedpers = persons
      // .filter((p)=>p.wtype!='1099')
      .map((p)=>{
        let hded=0
        let kded=0
        if(p.healthemp>0){
          hded = p.healthemp*12.0/50
        }
        if(p.k401emp>0){
          kded = p.k401emp*12.0/50
        }
        const taxablegross = p.regot.gross - hded - kded
        p.ded = {gross:drnd(p.regot.gross), healthded:drnd(hded), k401ded:drnd(kded), taxablegross:drnd(taxablegross) }
        // console.log('p.ded: ', p.ded)
        return p
      })
      this.setState({persons:dedpers},()=>this.calcWh())
  }


  calcWh=()=>{
    const lookupFedTax=(fedwh, singmar,period, subj2wh, w4add)=>{
      let tax = 0
      if(subj2wh>0){
        const lkup = fedwh
          .filter((wh)=>wh.singmar==singmar && subj2wh>wh.over && subj2wh<wh.notover)
        tax+=lkup[0].perc*subj2wh + w4add
        tax = tax>0 ? tax : 0
      }
      return tax
    }
    const calcStateTax = (p, strates, ssmed)=>{
      // console.log('in calcStateTax')
      // console.log('strates: ', strates)
      // console.log('state ', p.st, strates.st)
      if(p.st!=strates.st){
        strates=this.getStateRates(p.st)
      }
      switch(p.st) {
        case "MA":
          let sttax, stSubj2tax
          if(p.student || p.ded.taxablegross<strates.nowhbelow){
            sttax=0
          }else{
            const hoh = p.sthoh ? strates.hohded : 0
            const blind = p.stblind ? strates.blided : 0
            const allow = p.stallow ? p.stallow : 1 
            stSubj2tax = p.ded.taxablegross - strates.allow*allow -hoh - blind - ssmed
            sttax = stSubj2tax*strates.rate + p.stadd
            // console.log('p.staddtax: ', p.stadd)
            sttax = sttax>0 ? sttax : 0
          }
          return sttax
        default:  
          window.alert('We arent set up for '+p.st)
          return 0
      }
    } 
    const {persons, rates} = this.state
    const{fedr,fedwh, strates} =rates
    const whp = persons.map((p)=>{
      if(p.wtype!='1099'){
        const ssYtd = this.lookupAccrued(p.emailid, 'a2010-SS')/2
        const mediYtd = this.lookupAccrued(p.emailid, 'a2020-medi')/2
        const grossYtd = this.lookupAccrued(p.emailid, 'a2020-medi')/2
        const{taxablegross, gross}=p.ded
        const subj2wh = p.w4exempt ? 0 : taxablegross-(fedr.allow*p.w4allow)
        let ss = taxablegross*fedr.ssw
        let medi = taxablegross*fedr.mediw
        const ssmed = ssYtd + mediYtd >= strates.ficasub ? 0 : ss+medi //no fica ded over 2000

        const meda = 0
        const singmar = p.marital=='married' ? 'married' : 'single'
        const fedtax = lookupFedTax(fedwh, singmar, 'weekly', subj2wh, p.w4add)
        const sttax =  calcStateTax(p, strates, ssmed)
        const net = gross-fedtax-ss -medi - sttax
        p.wh={gross:gross, taxablegross:taxablegross, ss:drnd(ss), medi:drnd(medi), meda:drnd(meda), fedtax:drnd(fedtax), sttax:drnd(sttax), net:drnd(net)}
      }else{
        p.wh={gross:p.regot.gross, net:p.regot.gross}
      }
      return p
    })
    this.setState({persons:whp},()=>this.calcBurden())
  }

  calcBurden=()=>{
    const {persons, rates} = this.state
    const{fedr, cosr} =rates
    const burper = persons.map((p)=>{
      if(p.wtype!='1099'){
        const{ gross, grossAP}=p.regot
        const ss = drnd(gross*fedr.sse)
        const medi = drnd(gross*fedr.medie)
        let health = p.healthco>0 ? drnd(p.healthco*12.0/50) : 0
        let k401 = p.k401co>0 ? drnd(p.k401co*12.0/50) : 0
        let vaca = p.vacation>0 ? drnd(p.vacation/250*gross) : 0
        let holi = p.holiday>0 ? drnd(p.holiday/250*gross) : 0
        let pers = p.personal>0 ? drnd(p.personal/250*gross) : 0
        let suta = drnd(cosr.stuirate*gross)
        let comp = drnd(cosr.wcrate*gross)
        let futa = drnd(fedr.futa*gross)
        let tburden = drnd(ss+medi+health+k401+vaca+holi+pers+suta+comp+futa)
        let bpercent = (tburden+gross+grossAP)/(gross+grossAP)
        p.burden={gross,ss,medi,health,k401,vaca,holi,pers,suta,futa,comp,tburden, bpercent}
      }
      return p
    })
    this.setState({persons:burper},()=>this.calcCostPerHrPerDay())
  }

  calcCostPerHrPerDay = ()=>{
    const {persons} = this.state
    const coper = persons.map((p)=>{
      let np = {}
      const {sarate, surate, mfrate} =p.regot
      let burperc = 1
      if(p.burden &&  p.burden.bpercent){
        burperc = p.burden.bpercent
      }
      let ratarr = new Array(7).fill(drnd(mfrate*burperc*10)/10)
      ratarr[5]=drnd(sarate*+burperc*10)/10
      ratarr[6]=drnd(surate*burperc*10)/10
      np.ratearr = ratarr
      np.emailid=p.emailid
      np.wprt=p.wprt
      np.paydate=p.paydate
      p.jcrates = np
      return p
    })
    this.setState({persons:coper, waiting:false}, ()=>{
      console.log('this.state: ', this.state)
    })
  }

  lookupAccrued=(emailid, account)=>{
    const{accrued}=this.state
    const found = accrued.find((a)=>{
      return a.someid == emailid && a.account == account
    })
    //console.log('found: ', found)
    return found ? found.credit : 0
  }

  calcC=()=>{
    console.log('this.state: ', this.state)
    const {persons} = this.state
    persons.map((p)=>{
      let{hrsarr}=p
      hrsarr= JSON.parse(hrsarr)
      const{gross,grossAP, mff, saf, suf}=p.regot
      const burden = p.burden ? p.burden.tburden : 0
      const tcost = gross + grossAP + burden
      p.burden ? console.log('p.burden.bpercent: ', p.burden.bpercent, tcost/(gross+grossAP)) : console.log('no burden')
      console.log('p.regot: ', p.regot)
      console.log('hrsarr: ', hrsarr)
      console.log('gross+AP ', gross+grossAP, 'tcost: ', tcost, 'mff ', mff, 'saf ', saf, 'suf ', suf, 'bp ', burden/tcost)
    })    
  }


  paySelected = ()=>{
    const{persons}=this.state
    const jper = persons
      .filter((p)=>p.check)
      .map((p)=>{
        return p.jcrates
      })
    console.log('jper: ', jper)  
    postJobRates(jper)    
    this.apply2gl()
  }

  setAsPaid=()=>{
    const nstate = {...this.state}
    const perpa= nstate.persons.map((p)=>{
      const np = {...p}
      if (np.check){
        np.status='paid'
      }
      return np
    })
    this.setState({persons:perpa},()=>console.log('this.state: ', this.state))   
  }

  apply2gl=()=>{
    const{persons}=this.state
    let journal = [] 
    persons
      .filter((p)=>p.check)
      .map((p)=>{
        let blentry={account:'', wdprt:p.wprt, someid:p.emailid, job:'', cat:'', date:p.paydate, somenum: 0, debit:0, credit:0}
        let e ={...blentry}
        e.account ='a6010-gross'
        e.debit=p.regot.gross
        journal.push(e)
        let net = p.regot.gross
        
        if (p.regot.grossAP && p.regot.grossAP>0){
          e ={...blentry}
          e.account ='a2200-grossAP'
          e.credit=p.regot.grossAP
          journal.push(e)

          e ={...blentry}
          e.account ='a6010-gross'
          e.debit=p.regot.grossAP
          journal.push(e)
        }
        if (p.wh){
          if(p.wh.ss>0){
            e ={...blentry}
            e.cat='worker'
            e.account ='a2010-SS'
            e.credit=p.wh.ss
            journal.push(e)
          }
          if(p.wh.medi>0){
            e ={...blentry}
            e.cat='worker'
            e.account ='a2020-medi'
            e.credit=p.wh.medi
            journal.push(e)
          }
          if (p.wh.meda>0){
            e ={...blentry}
            e.cat='worker'
            e.account ='a2020-meda'
            e.credit=p.wh.meda
            journal.push(e)
          }

          if (p.wh.fedtax>0){
            e ={...blentry}
            e.cat='worker'
            e.account ='a2050-fedWh'
            e.credit=p.wh.fedtax
            journal.push(e)
          }
          if (p.wh.sttax>0){
            e ={...blentry}
            e.cat='worker'
            e.account ='a2060-stWh'
            e.credit=p.wh.sttax
            journal.push(e)  
          }
          net = p.wh.net
        }
        e ={...blentry}
        e.account ='a1010-cash'
        e.credit=net
        journal.push(e)
        if (p.burden){
          e ={...blentry}
          e.account ='a6020-burden'
          e.debit=p.burden.tburden
          journal.push(e)

          if (p.burden.ss>0){
            e ={...blentry}
            e.cat='co'
            e.account ='a2010-SS'
            e.credit=p.burden.ss
            journal.push(e)
          }
          if (p.burden.medi>0){
            e ={...blentry}
            e.cat='co'
            e.account ='a2020-medi'
            e.credit=p.burden.medi
            journal.push(e)
          }
          if (p.burden.futa>0){
            e ={...blentry}
            e.account ='a2080-FUTA'
            e.credit=p.burden.futa
            journal.push(e)
          }
          if (p.burden.suta>0){
            e ={...blentry}
            e.account ='a2090-SUTA'
            e.credit=p.burden.suta
            journal.push(e)
          }
          if (p.burden.comp>0){
            e ={...blentry}
            e.account ='a2100-comp'
            e.credit=p.burden.comp
            journal.push(e)
          }
          if (p.burden.k401>0){
            e ={...blentry}
            e.account ='a2110-401K'
            e.credit=p.burden.k401
            journal.push(e)
          }
          if (p.burden.health>0){
            e ={...blentry}
            e.account ='a2120-health'
            e.credit=p.burden.health
            journal.push(e)
          }
          if (p.burden.holi>0){
            e ={...blentry}
            e.account ='a2130-holiday'
            e.credit=p.burden.holi
            journal.push(e)
          }
          if (p.burden.vaca>0){
            e ={...blentry}
            e.account ='a2140-vacation'
            e.credit=p.burden.vaca
            journal.push(e)
          }
          if (p.burden.pers>0){
            e ={...blentry}
            e.account ='a2150-personal'
            e.credit=p.burden.pers
            journal.push(e)
          }
        }
      /*THESE ENTRIES UNBALANCE THE LEDGER balanced by postJobRates*/
        e ={...blentry}
        e.account ='a6010-gross'
        e.credit=p.regot.gross
        journal.push(e)
        if (p.burden){
          e ={...blentry}
          e.account ='a6020-burden'
          e.credit=p.burden.tburden
          journal.push(e)
        }
        if (p.regot.grossAP && p.regot.grossAP>0){
          e ={...blentry}
          e.account ='a6010-gross'
          e.credit=p.regot.grossAP
          journal.push(e)
        }
      })
    // const perpa= persons.map((p)=>{
    //   const np = {...p}
    //   if (np.check){
    //     console.log('in pcheck')
    //     np.status='paid'
    //   }
    //   return np
    // })
    // console.log('perpa: ', perpa)
    // this.setState({persons:perpa},()=>console.log('this.state: ', this.state))  
    console.log('journal: ', journal)  
    postJournal(journal)
      .then((res)=>{
        const tribal = res.tribal[0]
        console.log(tribal)
        const roundingerror = drnd(tribal.debit-tribal.credit)
        console.log('tribal.debit: ', tribal.debit, )
        console.log('roundingerror: ', roundingerror)
        const trbastr = `Trial Balance debit: \$${tribal.debit}, credit: \$${tribal.credit}, rounding error:\$${roundingerror}. If more than +/-$1.00 then there is a problem`
        console.log('trbastr: ', trbastr)
        window.alert(trbastr)
        console.log('this.state: ', this.state)
        // this.setAsPaid()
      })   
  }

  inWords=(dec)=>{
    const lookup = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    const str = dec.toFixed(2)
    const arr = str.split('.')
    const cents = arr[1]
    const dolls = arr[0].split("").map((d)=>parseInt(d))
    const len = dolls.length
    let isteens=false
    let dolstr = dolls.reduce((s,d,i)=>{
      let pos = len-i
      switch(pos){
        case 4:
          return s + lookup[d] + ' thousand '
        case 3:
          return s + lookup[d] + ' hundred '  
        case 2:
          if(d==1){isteens=true} 
          if(d==0){s=s.slice(0,-1)}
          return s + tens[d]+ ' '
        case 1:
          if (isteens){
            s=s.slice(0,-1)
            return s + teens[d]
          } else if(d==0){
            s=s.slice(0,-1)
            return s
          }else {
            return s + lookup[d]
          }
        default:
          return s  
      }
    },"")
    dolstr= dolstr.replace(/^[a-z]/, (c)=>c.toUpperCase())+' dollars and ' +cents+'/100'
    console.log('dolstr: ', dolstr)
    return dolstr
  }

  createPayPdf=()=>{
    console.log('increatepay.pdf: ')
    let doc = new jsPDF({
      orientation:'p', 
      unit: 'pt', 
      format: 'letter'
    });
    const pt = (n)=>Math.round(n*72)
    const{persons}=this.state
    // console.log('persons: ', persons)
    let cnt=-1
    persons
      .map((p)=>{
        // console.log('p: ', p)
        if(p.check){
          this.inWords(p.wh.net)
          cnt+=1
          const ot=p.regot.mfot+ p.regot.saot+p.regot.suot
          let regotc = ["", ""];
          let regotd = [
            ["hours", p.hrs],
            ["rate", p.rate],
            ["regular", p.regot.reg],
            ["overtime", ot],
            ["gross payable", p.regot.grossAP],
            ["gross", p.regot.gross]
          ];
          let columns = ["Taxes", ""];
          let whdata  
          if (p.wtype!='1099'){
            whdata = [
              ["ssi", p.wh.ss.toString()],
              ["medicare", p.wh.medi],
              ["fed wh", p.wh.fedtax],
              ["st wh", p.wh.sttax],
              ["netpay", p.wh.net]
            ];
          }else {
            whdata = [
              ["netpay", p.wh.net]
            ];
          }
          if(cnt>0){doc.addPage()}
          doc.setFontSize(16)
          doc.text(moment().format('MM/DD/YY'), pt(6.85), pt(.9))
          doc.text(`${p.firstmid} ${p.lastname}`, pt(1.5), pt(1.4))
          doc.text(`\$${p.wh.net}`, pt(6.85), pt(1.4))
          doc.text(this.inWords(p.wh.net), 100, 138)
          doc.setFontSize(12)
          doc.text('for 2018-W23', 60, 194)
          doc.autoTable(regotc, regotd,{
            startY: 300, 
            showHeader: 'firstPage',
            margin: {right: 107},
            tableWidth: 150,
            theme: 'grid',
            styles:{
              //halign:'right'
            }
          });
          doc.autoTable(columns, whdata,{
            startY: doc.autoTable.previous.finalY, 
            showHeader: 'firstPage',
            margin: {right: 107},
            tableWidth: 150,
            theme: 'grid',
            styles:{
              //halign:'right'
            }
          });

          doc.text('dog and cats together', 60, doc.autoTable.previous.finalY + 100)
        }
    })
    doc.autoPrint()
    doc.save('pay.pdf')
  }

  getCurrent=(persons)=>{
    const cdate = moment().format('YYYY-MM-DD')
    const cperson = persons
      .filter((person)=>person.rate>0 && person.effective && person.effective<=cdate && person.active )
      .reduce((t,p)=>{
        const  oeid =t.slice(-1)[0].emailid
        if(oeid != p.emailid){
          t.push(p)
        }
        return t
      },[{emailid:'dog'}])
    return cperson.slice(1)
  }  

  getQuery=()=>{
    const params = this.props.cambio.page.params
    if(params && params.query =='rerender'){
      location.replace('#persons')
      setTimeout(()=>{
        this.getPay()
      },300)     
      
    }
  }

  handleCheck = idx => e =>{
    let nstate = {...this.state}
    const persons=nstate.persons.slice()
    persons[idx].check=e.target.checked
    this.setState({persons})
  }

  handleCheckAll = (e) =>{
    let nstate = {...this.state}
    const npersons= nstate.persons.slice()
    const ckper = npersons.map((p)=>{
      p.check=e.target.checked
      return p
    })
    this.setState({persons:ckper, checkall:e.target.checked}, ()=>console.log('this.state: ', this.state))
  }

  renderRegOt = (p)=>{
    if(p.regot){
      const{reg, gross, grossAP}=p.regot
      const ot = p.regot.mfot+p.regot.saot+p.regot.suot
      return(
        <table style={style.table.table}><tbody>
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>reg.</td>
          <td style={style.table.thtd}>{reg.toFixed(2)}</td>
        </tr>
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>o.t.</td>
          <td style={style.table.thtd}>{ot.toFixed(2)}</td>
        </tr>
        {grossAP>0 && 
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>APgross</td>
          <td style={style.table.thtd}>{grossAP.toFixed(2)}</td>
        </tr>
        }
        <tr style={style.table.tr}>
          <th style={style.table.thtd}>gross</th>
          <th style={style.table.thtd}>{gross.toFixed(2)}</th>
        </tr>
        </tbody></table>  
      )
    }
  }
  renderDed = (p)=>{
    if(p.ded && (p.ded.healthded>0 || p.ded.k401ded>0)){

      return (
        <table style={style.table.table}><tbody>
        <tr><th style={style.table.col2} colSpan="2">Deductions</th></tr>  
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>health</td>
          <td style={style.table.thtd}>{p.ded.healthded.toFixed(2)}</td>
        </tr>
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>401K</td>
          <td style={style.table.thtd}>{p.ded.k401ded.toFixed(2)}</td>
        </tr>
        <tr style={style.table.tr}>
          <th style={style.table.thtd}>taxable</th>
          <th style={style.table.thtd}>{p.ded.taxablegross.toFixed(2)}</th>
        </tr>
        </tbody></table>  
      )
    }
  }

  renderWh = (p)=>{
    if(p.wh && p.wtype!='1099'){

      return (
        <table style={style.table.table}><tbody>
        <tr><th style={style.table.col2} colSpan="2">Taxes</th></tr>  
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>ssi</td>
          <td style={style.table.thtd}>{p.wh.ss.toFixed(2)}</td>
        </tr>
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>medicare</td>
          <td style={style.table.thtd}>{p.wh.medi.toFixed(2)}</td>
        </tr>
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>fed wh</td>
          <td style={style.table.thtd}>{p.wh.fedtax.toFixed(2)}</td>
        </tr>
        <tr style={style.table.tr}>
          <td style={style.table.thtd}>state wh</td>
          <td style={style.table.thtd}>{p.wh.sttax.toFixed(2)}</td>
        </tr>
        <tr style={style.table.tr}>
          <th style={style.table.thtd}>net pay</th>
          <th style={style.table.thtd}>{p.wh.net.toFixed(2)}</th>
        </tr>
        </tbody></table>  
      )
    }
  }



  renderPay=()=>{
    // console.log('re-rendering pay')
    let {persons}=this.state
    const rpersons = persons
      .map((aperson, i)=>{
        if(aperson.status=='approved'){
          const regot = this.renderRegOt(aperson)
          const wh = this.renderWh(aperson)
          const dedu = this.renderDed(aperson)
          const lid = 'li'+i
          return (
          <li id={lid} key={i} style={style.myli.li}>
            <div style={style.myli.person}> 
            <input style={style.ckbox} type="checkbox" checked={aperson.check} onChange={this.handleCheck(i)}/> 
              <span><br/>
              {aperson.wprt}<br/>
              {aperson.emailid}<br/>
               <span>{aperson.firstmid} {aperson.lastname}</span> <br/>
                {aperson.street}<br/>
                {aperson.city}, {aperson.st} {aperson.zip}<br/>
                worker type: {aperson.wtype}
              </span>
            </div>
            <div style={style.myli.cat}>
              <span>  
              ${aperson.rate} x {aperson.hrs}hrs<br/>
              {regot}
              {dedu}
              {wh}
              </span>
            </div>
          </li >)
        }
    })
    return(
      <ul style={style.myli.ul}>
        {rpersons}
      </ul>     
    )
  }

  render(){
    if(!this.state.waitng){
      const{persons }=this.state
      if (persons){
        //this.getQuery()
        // const actstyle = this.setStatBkg()
        const rndrdpersons = this.renderPay()
        return(
          <div >
            <div style={style.he}>
              <div> 
              <button style={style.he.but.hi} onClick={this.createPayPdf}>print Paychecks</button><br/>
              <button style={style.he.but.hi} onClick={this.calcC}>calcC</button><br/>
                  {/* 
                  <button style={actstyle.ia} onClick={this.filtInAct}>inact</button>
                  <button style={actstyle.al} onClick={this.filtAll}>all</button>
                   */}
                  <span >
                    <input style={style.ckbox} type="checkbox" checked={this.state.checkall} onChange={this.handleCheckAll}/> 
                    {/* <button style={actstyle.cu} onClick={this.dfiltCurrent}>current</button>
                    <button style={actstyle.fu} onClick={this.dfiltFuture}>future</button> */}
                    <button style={style.he.but.hi} onClick={this.paySelected}>Pay Selected</button>
                    {/* <button style={actstyle.da} onClick={this.dfiltAll}>all</button> */}
  
                  </span>
              </div>
            </div>
            <div style={style.myli.od}> 
              {rndrdpersons}
            </div>
          </div>
        )
      }else{
        return(
          <div style={style.he}>
            <p>Message from server: {this.state.qmessage}. </p><br/> <p> The link below will take you home where you will be asked to re-register. This will take you to a list of apps you can use in your company. If you are registered in more than one company, you can choose your company first. <a href={makeHref(location.hostname, 'signup', '#urapps')} >HOME</a></p> 
            
          </div>
          )
      }
    }else{
      return(
        <div style={style.he}>
          <h1>WAITING</h1>
        </div>
      )
    }
  }
}
Pay = mapClass2Element(Pay)

export {Pay}

const style = {
  btn:{

  },
  he:{
    overflow:'hidden',
    margin: '2px 10px 10px 10px',
    padding: '4px',
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
      },
      cu:{
        margin: '4px',
        padding: '4px'
      },
      fu:{
        margin: '4px',
        padding: '4px'
      },
      hi:{
        margin: '4px',
        padding: '4px'
      },     
      da:{
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
    person:{
      padding: '3px',
      width: '50%',
      float: 'left',
      background: '#99CCCC'
    },
    cat:{
      padding: '2px',
      width: '36%',
      float: 'left',
      background: '#99CCCC'
  
    },
    act:{
      width: '10%',
      float: 'right',
      background: '#99CCCC'
  
    }
  },
  table:{
    div:{
      float:'right',
      background: 'white',
      width: '130px'
    },
    table:{
      borderCollapse: 'collapse',
      width: '100%'
    },
    tr:{
      padding: '0px',
      margin: '0px'
    },
    thtd:{
      padding: '0px',
      margin: '0px',
      textAlign:'right'
    },
    col2:{
      textAlign:'left'
    }
  },
  ckbox:{
    MozTransform: 'scale(1.2)',
    msTransform: 'scale(1.5)',
    WebkitTransform: 'scale(1.8)',
    OTransform: 'scale(1.5)',
    padding: '10px',
    margin: '10px'
  }
}

