# 
https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56

https://medium.com/@joomiguelcunha/react-performance-tips-5fa199a450b2

https://blog.risingstack.com/introducing-react-easy-state/?utm_campaign=React%2BNewsletter&utm_medium=email&utm_source=React_Newsletter_104

https://cloudinary.com/console/welcome

json2form
https://github.com/mozilla-services/react-jsonschema-form

ncheckalldddd
## tags
https://gridbyexample.com/examples/example13/
https://www.mozilla.org/en-US/firefox/60.0a2/whatsnew/#cssgrid
https://mozilladevelopers.github.io/playground/css-grid/

https://accountinginfocus.com/financial-accounting/liabilities-financial-accounting/recording-payroll-and-payroll-liabilites/

https://www.seyfarth.com/dir_docs/publications/neht01120810.pdf ma tax law
https://www.seyfarth.com/dir_docs/publications/neht01120810.pdf
https://www.michigan.gov/mdcs/0,4614,7-147-6879_19184_21557-234596--,00.html


https://github.com/MrRio/jsPDF printing at precise locations
### 113-oktcard-submitted
Submitted tracks status via TcChanges 'submit' ->reCalcStatus if/else -> updateSubmittedStatus
### 112-oktcard-firstday
how is firstday set?

fetchSettings gets firstday from co and puts in in ls.firstday. In fetches fetchWhoTcard.processDb4app adjusts the week for the app and put*.adjDay4db puts it back on the server.



### 110-tc-feature-nojobs
#### How does tcard work?
Timecards is wrapped in TimecardsJar whose job is to have all the user changes perculate to it and then pass them down to components Day and Jobcost.

Timecards gets settings and timecards from the fetches->server and puts them into state. TimecardsJar also handles changes coming from user interaction in Timecards(changeWeek, submit), Day(iopu), or JobCost(iopu, jcost). 

TimecardsJar.getTimeCard sets `hayjobs` to false if there are no jobs for the week. `!nohayjobs` turns off the `toggle jobs` and `clearjobcosts ` buttons in `JobCosts` since they don't apply. TimecardsJar.handleTcardChanges.oupu intercepts the case wher jobs.length==0 and bypasses the normal process of forcing worker to reconcile punchio hours to jcost hrs. It does this by filling in an wkarr[idx](that days entry)  with the following: jcost = `[{job:'labor expense', cat:'general', hrs:chobj.hrs}]`, jchrs = chobj.hrs and sets modtcatd.wstat.status to 'no job hrs changed' which toggles back to `ready` in recalcStatus(). There is still one jobcost record for that person and day and every time there is a change in iopu with nojobs, the hrs of the rec is updated

          const rec = {
            wdprt:wkarr[idx].wdprt,
            jcost:jcentry,
            emailid:modtcard.emailid
          }
          putTcardJc(rec)

no servers have been harmed in this feature addition
### 110-tc-todo

fix tcard oktcard to allow general payroll expense when jobs don't exist

### 109-tc-signup
### 108-tc-pay-beta
### 108-tc-pay-gl-journal
### 108-tc-persons-pay-jcrate-grossAP
TODO save the gl
### 107-tc-pay-payroll-addappid

### 106-timecards-persons-ded-ben
### 105-timecards-signup
Things to add: deductions before taxes: health & 401K, employee location, SUTA employee type: 1099,hourly,salary,salry-nexs To book the vacation accrual, debit vacation expense and credit the accrued vacation liability.When an employee subsequently takes a vacation, debit the vacation accrual and credit cash.

1.Create your payroll journal entry with the sum of your gross pay listed as a debit to the expense account for your payroll processing.

2.Add credits to the journal entry for your tax liability accounts, other contribution liabilities and the cash account. The amount credited to the cash account will reflect the actual money paid to your employees as net pay.



    Small Business»
    Human Resources»
    Health Insurance»

How to Account for the Employee Portion of Health Insurance Premiums
by Tara Kimball
Health premium contributions are a common payroll deduction.
Related Articles

    1
    Record Payroll Health Insurance Premium Payments in Accounting
    2
    Payroll Deductions as Liabilities Vs. Payroll Expenses
    3
    Ways to Determine an Employee's Portion of Health Insurance When It Is Based on Age
    4
    How Do I Show a General Journal Entry for Company Deductions From Employee Payroll?

When your employees pay a portion of their company-provided health insurance premiums, deduct their portion from each paycheck in the same manner as you handle the tax withholding and other deductions. Account for the health insurance premiums in your general ledger to maintain accurate records of your liabilities for reporting purposes until the premium payments are due, and post them to your expense account.

1.

Create your payroll journal entry with the sum of your gross pay listed as a debit to the expense account for your payroll processing.

2.

Add credits to the journal entry for your tax liability accounts, other contribution liabilities and the cash account. The amount credited to the cash account will reflect the actual money paid to your employees as net pay.

3.

Include a credit for the total of the employee health insurance deduction. Post the credit in a liability account labeled as a health insurance payable account, but label this account as employee contributions. Create a separate liability account for your share of the premiums.

4.

Post a debit to the liability account for the payable account balance when you issue your premium payment. Offset the debit with a credit to your cash account to reflect the payment.

OK so you journal a paycheck by debiting payroll expense with gross pay and crediting taxes(emp & co), cash(netpay), health insurance payable(emp), health ins payable(co), same for 401k and vaca holiday.

Now to get from gross to job costs you credit gross and debit jobs(inprocess). This assigns the expense to a job and  As you get payments you credit jobs(inprocess) and debit cash. Your gross profit on a job is the differece. 

Percent complete as a number is what you have earned on a job. If you are 60% done on a 10000 job you have earned 6000. If you have been paid 4000 then you have debited cash and credited jobs(inprocess)4000 To account for the 2000 owed you credit jobs(inprocess) and debit accounts recievable.

Once the job is done have debits for it that are the cash(payments) accounts recievable. The credits for a job are all the payments you got. The debits are all the expenses for that job. If you made mone ther is a credit balance. 

Each weeks payroll expense can be zeroed by crediting payrol expense and distributing it to jobs. How to do that. For each employee week there is an array of hrs for each day. There is also an approtionment array like [1.17,1.17,1.17,1.17,1.5, 2.0] whis is used to apportion overtime pay / day. So if reg was 800 mfot was 120 and sa   

What is it? 

https://s3-us-west-2.amazonaws.com/courses-images-archive-read-only/wp-content/uploads/sites/1430/2016/03/04031427/job-cost-flow.pdf

### 104-timecards-pay-net
Data created by calcs is

    regot:
      gross: 662.2
      mff: 1.0715509854327336
      mfot: 33.400000000000034
      reg: 560.3
      saf: 1.5
      saot: 25
      suf: 2
      suot: 43.5

    wh:
      fedtax: 95.26
      gross: 662.2
      medi: 9.6019
      net: 464.0980733
      ss: 41.056400000000004
      sttax: 52.183626700000005     

### 102-timecards-persons-current
current button by filtering and mapping through persons array whenever it changes
### 101-timecards-persons-done
### 100-timecards-person-addperson
### 99-timecards-tcard.done
### 98-timecards-jobs.done
registered is coied for each app since each app will chjeck its own permissions
### 97-timecards-jobs.src.1.registered-common.src1.fectches
### 96-reroo-payroll-V1-tcard-v
### 95-reroo-payroll-src.2
hay flowchart. todo submitted and hilight colors
### 94-reroo-jobs-src.4-beta0.4

How to update from another page or server and also from inputs on the current page. getDerivedStateFromProps takes incoming props and turns it to state.props. Then changes bubbleing up from the paage enclosed by the HOC can then change that state.props. Weird.


    let chHOC = (Comp) =>{// eslint-disable-line no-unused-vars
      return class PP extends React.Component {
        constructor (props){
          super(props);
        }
        state={}
        static getDerivedStateFromProps(props, state){// eslint-disable-line no-unused-vars
          return {props}
        }
        onChange=(curjob)=>{
          console.log('curjob: ', curjob)
          let nstate  ={...this.state}
          let nprops = {...nstate.props}
          let nejob = {...nprops.ejob}
          nejob.curjob = curjob
          nprops.ejob = nejob
          this.setState({props:nprops},()=>console.log('this.state: ', this.state))
        }
        render() {
          console.log('this.props: ', this.props)
          console.log('this.state: ', this.state)
          return (
            <Comp {...this.props} {...this.state} xmitChange={this.onChange}/>
          )
        }
      }  
    }

    AddJob = mapClass2Element(chHOC(AddJob))

### "
Changed the css so each component panel has independent css. 
So took away and class content, item-default or inner, outer from the tcard component. Tcard has a header `he` and a blank div for `renderDays`. In `Day` each days card has a tcardDiv with `overflow:hidden` which is the magic sauce that streches the subsequent divs to fit their content

Otherwise added 

    checkFetchStatus=()=>{
      if(this.state.wstat){
        let newstat = this.state.wstat.status
        let showsub
        if(newstat=='ready'){
          showsub=true
        }else{
          showsub=false
        }
        this.setState({showsub})  
      }
    }

to be called after the `getTimeCard` fetch
### 91-reroo-payroll-src.1-todostatus
### 90-reroo-jobs-src.3-beta0.0
https://makeappicon.com/
### 89-reroo-tcard-src.15-about-reponsive
### 88-reroo-tcard-src.14-beta0.3
### 87-reroo-tcard-src.13-beta0.2
### 86-reroo-tcard-src.12-beta0.1
### 85-reroo-tcard-src.11-beta0
### 84-reroo-tcard-src.10-css-savedel-jcpu
TODO css and status
### 83-reroo-tcard-src.9-blwk_pad_to_server
### 82-reroo-tcard-src.8-tcardwk-status-css
TODO display tcardjc w/o punch, tcardwk 
### 81-reroo-tcard-src.7-jobcost-functions
need to save jcost record
### 80-reroo-tcard-src.6-JobCost
basic setup
### 79-reroo-tcard-src.5-punchdone
hooray on to jobcost
### 78-reroo-tcard-handleDayChanges

In order to diplay inout you need a new copy of newdata.inout, a new copy of newdata and a new copy of this state.wkarr. Don't be shallow.

    handleDayChanges = (newdata)=>{
      const inout = newdata.inout.slice()
      const ndata= {...newdata}
      ndata.inout=inout
      const idx = ndata.idx
      let wkarr = this.state.wkarr.slice()
      wkarr[idx]=ndata
      this.setState({wkarr, ctime:newdata.inout.slice(-1)})
      console.log('this.state: ', this.state)
    }

### 77-reroo-tcards-src.4-refactor

This is now what comes from the database, The server combines the results of tcardpu and tcardjsc into records for each day of the week that there is tcardpu data. If there is no tcardpu data but there is tcardjc data then it will leave that data on the server and return [].



    parr:  
    { wkarr:
      [ { wdprt: '2018-W34-5',
          hrs: 0,
          inout: [],
          jcost: [],
          jchrs: 0,
          idx: 0 },
        { wdprt: '2018-W35-1',
          hrs: 8.25,
          inout: '["7:30", "15:45"]',
          jcost: [Array],
          jchrs: 8.25,
          idx: 1 },
        { wdprt: '2018-W35-2',
          hrs: 8.5,
          inout: '["7:15", "15:45"]',
          jcost: [Array],
          jchrs: 8.5,
          idx: 2 },
        { wdprt: '2018-W35-3',
          hrs: 0,
          inout: [],
          jcost: [],
          jchrs: 0,
          idx: 3 },
        { wdprt: '2018-W35-4',
          hrs: 7.25,
          inout: '["8:30", "15:45"]',
          jcost: [Array],
          jchrs: 7.25,
          idx: 4 },
        { wdprt: '2018-W34-6',
          hrs: 0,
          inout: [],
          jcost: [],
          jchrs: 0,
          idx: 5 },
        { wdprt: '2018-W34-7',
          hrs: 0,
          inout: [],
          jcost: [],
          jchrs: 0,
          idx: 6 } ],
      hrs: [ 8.25, 8.5, 7.25, 9.5 ],
      jchrs: [ 8.25, 8.5, 7.25, 9.5 ] }

On the app side, F

Fetches is responsible for padding the data with a blank week, adjusting the week so friday saturday and sunday are displayed as the week before, ordering the records so Sa and Su are at the bottom of the list and creating arrays of hours for pu and jchrs for the week.

TimeCard.js
copies the data into state so the app refreshes on week selection. Day sends data to Timecard any time the timeclock is punched so then Timecard can rattle the state so it rerenders.

Day 
TODO Day is responsible for creating the ioperiods rows. Day also does a database save of a day record whenever the timeclock is punched.

    const processDb4app =(res)=>{
      const wkarr = wkendLast(adjWk4app(cfg.firstday, padWkData(res.wk, res.wkarr)))
      const hrs= sumThing(res.wkarr, 'hrs')
      const jchrs= sumThing(res.wkarr, 'jchrs')
      console.log('wkarr: ', wkarr)
      console.log('hrs: ', hrs)
      console.log('jchrs: ', jchrs)
      return {wkarr, hrs, jchrs, emailid:lsh.email}
    }



### 76-reroo-tcards-src.3-prepareDayData
instead of Day.creatIoList. Saves data, updates on load, on week change or punch the clock data is rediplayed. Save happens anytime you punch the clock
### 76-reroo-tcards-src.2-sumData
sendData sends hrs for the day and also and array of inout

reroo-jobs got updated to update a job based upon idx not name
### 75-reroo-tcards-v2-sendData
### 74-reroo-tcards-v1
### 73-reroo-jobs-v6-multi
### 72-reroo-jobs-v5-admojobs
add update delete jobds in AddJobs
### 71-reroo-jobs-v4-sortjobs
uses https://github.com/atlassian/react-beautiful-dnd demo:https://codesandbox.io/s/ovlqnxvjzq

addjobs uses muicss
### 70-reroo-jobs-v2-savegetwk

### 69-reroo-jobs-v1-denv.json
Since there is nothing private in the env on the app side, it doesn'thave to be 
hidden from git. 

`
      {
        "https":{
          "coid": "reroo",
          "appid": "jobs",
          "url": {
            "soauth": "https://services.sitebuilt.net/soauth",
            "api": "https://services.sitebuilt.net/reroox/api"
          },
          "cbPath": "#registered"
        },
        "local": {

        }
      }

      const authqry = cfg.url.soauth+"/spa/"+cfg.coid+"-"+cfg.appid+"?apiURL="+encodeURIComponent(cfg.url.api)+"&cbPath="+encodeURIComponent(cfg.cbPath)
`
### 68-reroo-jobs-v0b-jobs
TODO post
### 67-reroo-v0a-env.json
worked connecting frontend to new api, local doesn't work since you cant callback from the internet to localhost

      { 
        "https": {
        "appid": "jobs",
        "cbPath": "#registered",
        "url": {
          "soauth": "https://services.sitebuilt.net/soauth",
          "api": "https://services.sitebuilt.net/reroox/api"
        }
      },


roroo names?

* jobs
* tcards

What would a blank project look like?

* It would have register and registered
* it would navigate by navigo
* it would use rxjs for state stream

reroo/aaa has all that

How does responsive work?

Window resize is subscribed to in `app.js` and is set at the start in `store.js/initialBrowser`

When it changes the `action/setDeviceType(ws)` is fired which gets reduced in `reducers/responsive/SET_DEVICE` which changes the state by taking the window size `ws` from the payload and the `state/sizes` array and reducing the array to the index that ws falls in in the sizes array. `state/types` is a list of browser type text strings. The size index is used as the types[index] and `state.browser` is changed to that.

When `state.browser` changes `App.showPage()`re-renders calling `responsivePage` from `showRWD.js`, All the components invloved are imported in to showRwd, and, from the index of the state.browser in types we can derive the panesPerType. Now, if `compoi.multi` defines multiple elements for a view, then it proceeds to map through those elements, creating an array of react pages to display. Otherwise it just displays the page that is current in `state.cambio.page.name`

How does routing work?

The name of the page is in `state.cambio.page`. Whenever it changes, the page is re-rendered through `App.showPage()` as described above.

The navigo router calls `actions/responsive/switchPage` in `routing` which reduces on PAGE_SWITCHED changing `state.cabio.page`

To route click <a style={mStyle.a} href="about" data-navigo> or programatically import {router} from '../app' then `router.navigate('/about')`

###reroo
does registration allow for an identifier beyond just app name?

a job app that 

### 66-builder-v0f-deployed
this is the deployed version 0. It is deployed as https://iot.sitebuilt.net/builder.
webpack production should from here on in use a dirname that is the same as the app name `builder/v0/builder` instead of `builder/v0/dist2`. Then ./deploy.sh does this `scp -r ./builder root@sitebuilt.net:/home/iot/public_html/geniot/raw`
### 65-builder-v0e-add-save-delete
still sloppy,maybe w broke parts, needs cleanup tobe done
### 64-builder-v0d-mui
https://www.muicss.com/docs/v1/react/select
### 63-builder-v0c-rjv

- builder should only see devices it owns
- builder should only be able to edit devid, spec, descr and owner
eidt using https://github.com/mac-s-g/react-json-view in Select.js

### 62-builder-v0b
back to it after 6 weeks off, just fixed it to run w/o errors. TODO limit the scope of builder than on to installer and owner

builder

- accesses devs but can't see other devices
- can add devices and give them ids
- can run builder why?? because it is in builders table??
- can sell device to (new)owner (adds email/appid:owner to auths) whenever owner is changed it changes 
- can suggest installers to owner

owner

- accesses devs it owns
- can authorize installer
- can sell device to (new)owner (adds email/appid:owner to auths) whenever owner is changed it changes also if sells its last device is removed from owners
- can add and install apps that use the device
- can authorize a developer to add/install their app
- controls users and observers of apps running on users devices

users observers



Owners grant access and assign roles to users to particular apps running on their hardware devices. Roles include owner, builder, installer, developer, user and observer. Owner can activate or unactivate any role players. 

- builder - puts together the hardware completes 

### 61-builder-v0b

### 61-builder-v0a

awful bit of programming by me. why use the router once you are registered. state of confusion
### 61-builder-v0
If you want to edit props -waddya do- take61 Oy???
At azoy.here thus 

### 60-builder-v0

When a device is built it has certain hardware based characteristics and capabilitys. They get listeb by the builder and are the `spes` in devs. There is and administrative application for the builder that allows them to define the device specs.

builder
home
select
  select box
  new button
edit
  devid
  specs
  descr

installer
home
devedit
  server
  loc 
  button2locedit
locedit
  locid
  address
  latlng
  timezone

developer

  


### 59-timr-v0
starting from nothing

1. make entries in db- app_loc, user_app_loc, devs
2. make sure there are at least default programs for each device/senrel

`{"HAStIMER":28,"notTimerTags":["temp","onoff","hilimit","lolimit"],"sr":[{"id":0,"hayrelay":0,"sensor":{"senses":"temp","model":"DHT22"}},{"id":1,"hayrelay":0,"sensor":{"senses":"humid","model":"DHT22"}},{"id":2,"hayrelay":1,"sensor":{}}]}`

#### builder
When a device is built it has certain hardware based characteristics and capabilitys. They get listeb by the builder and are the `spes` in devs. There is and administrative application for the builder that allows them to define the device specs

builder only works in devs, has permission to add devs record. System checks that the device id isn't already used. Builder logs in as 

     devid: CYURD002,
     description:  
     spec: {
        software_version: 2.0,
        hardware_version: wemos,
        sr: [
        {
          "srid":0,
          "hayrelay":{
            "controlled":1, //implies hilimit lowlimit
            "diff":2,
            "defsched":[[0,0,78,76]] //any device with a relay needs a default schedule
          },
          "haysensor":{
            "senses":"temp",
            "model":"DHT22"
          }
        },
        {
          "srid":1,
          "hayrelay":0,
          "haysensor":{
            "senses":"humid",
            "model":"DHT22"
          }
        },
        {
          "srid":2,
          "hayrelay":{
            "controlled":0, //not controlled by hilimit,lowlimit
            "defsched":[[0,0,1]]
          },
          "haysensor":0
        }
      ]
    }
    owner: builder@dogo.com

{
"software_version": "2.0",
"hardware_version": "wemos",
sr: [
{
  "srid":0,
  "hayrelay":0,
  "haysensor":{
    "senses":"temp",
    "model":"DHT22"
  }
},
{
  "srid":1,
  "hayrelay":0,
  "haysensor":{
    "senses":"humid",
    "model":"DHT22"
  }
},
{
  "srid":2,
  "hayrelay":{
    "controlled":0,
    "defsched":[[0,0,1]]
  },
  "haysensor":0
}
]
}

####  installer
An installer enters the location, server, owner and wifi information into the device and database. 

    locid: 12ParleyVale
    address: 12 Parley Vale, Jamaica Plain, MA 02130
    latlng: {"lat":42.315,"lng":-71.111}
    timezone: America/New_York
    owner: tim@sitebuilt.net
    {
      "mqtt_server":"sitebuilt.net",
      "mqtt_port":"1884",
      "sensor_type":"DHT" //legacy day for the device
    }  

devs gets added/updated with

    owner: udpated owner
    server: {mqtt_server, mqtt_port}
    devpwd: 
    locid: 12ParleyVale    


#### developer - app spec
Apps access and contol devices. When an app is developed it has a definition of needed sensors and relays and where they are gonna be used and what they are called 

        appid: hvac
        description: 
        sr:
        [
           {
              "label":temp-gh",
              "name":"Greenhouse Temperature",
              "img":"temp-gh.jpg"
              "desc" "tepm sensor with controlled relay"
           },
           {
              "label":hum-gh",
              "name":"Greenhouse Humidity",
              "img":"hum-gh.jpg"
              "desc": "hum sensor"
           },
           {
              "label":light-gh",
              "name":"Greenhouse Lights",
              "img":"light-gh.jpg"
              "desc" "timer relay"
           },
           {
              "label":temp-out",
              "name":"Outside Temperature",
              "img":"temp-out.jpg"
              "desc": "temp sensor"
           }
        ]



If an owner had the harware capabilities needed, they can install an app that allows them to access and controll their hardware. At each location an app definition gets paired to devices and relays that can supply the functionality via a common label

    appid: hvac,
    sr: 
    {
       "CYURD004":[
          {
             "sr":0,
             "label":"temp-gh"
          },
          {
             "sr":1,
             "label":"hum-gh"
          },
          {
             "sr":2,
             "label":"light-gh"
          }
       ],
       "CYURD006":[
          {
             "sr":0,
             "label":"temp-out"
          }
       ]
    }

or app_devs

   appid: hvac
   sr: [
      {
        label:
        devid:
        srid:
      },
      {
        label:
        devid:
        srid:
      },      
   ] 


When a particular instance of an app is instantiated, the location determines which devices are being used and the sensor relay specs that are need are grabbed from the he device specs. Everything is combined 

{
  "appid":"greenhouse",
  "cloc":"12paleyVale",
  "ts":"America_NewYork",
  "static":[
    {
      "label":"temp-gh",
      "name":"Greenhouse Temperature",
      "img":"temp-gh.jpg",
      "devid":"CYURD004",
      "srid":0,
      "hayrelay":{
        "controlled":1,
        "diff":2,
        "defsched":[[0,0,78,72]]
      },
      "haysensor":{
        "senses":"temp",
        "model":"DHT22"
      }
    },
    {
      "label":"hum-gh",
      "name":"Greenhouse Humidity",
      "img":"hum-gh.jpg",
      "devid":"CYURD004",
      "srid":0,
      "hayrelay":0,
      "haysensor":{
        "senses":"humid",
        "model":"DHT22"
      }
    },
    {
      "label":"light-gh",
      "name":"Greenhouse Lights",
      "img":"light-gh.jpg",
      "devid":"CYURD004",
      "srid":2,
      "hayrelay":{
        "controlled":0,
        "defsched":[[0,0,1]]
      },
      "haysensor":0
    },
    {
      "label":"temp-out",
      "name":"Outside Temperature",
      "img":"temp-out.jpg",
      "devid":"CYURD006",
      "srid":0,
      "hayrelay":0,
      "haysensor":{
        "senses":"temp",
        "model":"DSP18b20"
      }
    }
  ]
}

Now the app can connect to the mqqt data that it needs for whatever page it is on.

qdata:[
  {
    devid
    id
    label
    sensor: {hay:0}
    sensor: {hay:1, reading:72, setpt:68, diff:2}
    relay: {hay:0}
    relay: {hay:1, state:1, sched[]}
  }
]
`
Owners grant access and assign roles to users to particular apps running on their hardware devices. Roles include owner, builder, installer, developer, user and observer. Owner can activate or unactivate any role players. 

owner owns devid
      has one or more apps for owned device

owner of device gives users observers permission to use app on their device

Do users/observers need separate permission for every device used in an app?  

A builder builds something, builder owns it, can sell to new owner     

### 58-hvac-v8s-SchedEdit
delete add to SchedEdit 
### 57-hvac-v8r-handleSend2server-convertDbFromWsched-make2dArr
TODO delete add to sched
save back to server
### 57-hvac-v8q-save4selected-alterWeek
TODO save back to server

* `save4selected days` will call `alterWeek` with this.state.wsched which has the old schedule still, this.state.cursched which and the new sched but the old days, this.state.dayselected has the new days, this.state.cidx is the index of the schedule object being editied
* `alterWeek` 
    * combines the new sched with the new days
    * pops off the day being changed off the week sched array
    * goes through wscehd array and checks its days, removes the ones being changed and if there are any days left, keeps what's left
    * checks to see if there are any of the old days being edited that didn't get included in the new days. If so it keeps them.
    * the new wek is sorted and returned 

do the heavy lifting of 0) pop current sched off wsched  1) checking if all the original `days` are accounted for in `daysselected` , if not change the `days` to just include the prior days not changeing and push them onto wsched. 2) go through all the `selectedays` and pop off and delete all the existing days in wsched. 3) push currentsched `s` onto wsched. 4) resort on sched and redisplay.

### 56-hvac-v8p-display-modify-sched-days

* component mounts fetches wsched and puts it in state
* `displayDays` runs mapping over wsched
* `displaySched` outputs 'no schedule'
* on daysbutton push `changeSched(i)`put a copy of cursched,days and cidx in state
* `displaySched` outputs cursched
* on pushing `modify days sched`,  handleDaySched runs changind state to edit which redisplays as <SchedEdit>
* after editing, on pushing `save`fromSched={this.modifiedSched}
* modifiedSched(s) puts the edited schedule in state.cursched, does wsched change???? YES, it shouldn't (neither Object.assign nor ... do a deep copy)

At the point once saved, the original weksched is updated to the new schedule but the days field of the currec entry of wsched needs to maybe be altered and any other records with days fields in dayselected need to be modified or deleted. 

- change days of currcshed
- for every record, 
    pull out days array


TODO `save4selected days` will do the heavy lifting of 0) pop current sched off wsched  1) checking if all the original `days` are accounted for in `daysselected` , if not change the `days` to just include the prior days not changeing and push them onto wsched. 2) go through all the `selectedays` and pop off and delete all the existing days in wsched. 3) push currentsched `s` onto wsched. 4) resort on sched and redisplay.

subroutine - compare [a wsched[i] or currentsched](existing) to [candidate`s`](proposed) and return with days only those not in proposed. or null/[].

### 55-hvac-v8o-no-ck4change-in-cdm-and-fetchScheds
Detecting dev and or id is in componentDidMount. fetchScheds returns a dowd like object
### 54-hvac-v8n-bughunt-nomo-ck4changeWeek
ADVICE: don't be fucking too tricky. You need to detect change? console log the shit out of it until you can. Double the detection when you sare detecting dev and or id. Still a problem.
### 53-hvac-v8m-ck4changeWeek
### 52-hvac-v8l-ck4change-schedUpdateQdata
process to schedobj as soon as the data rolls in from mqttStore. Sense page change first thing once hookup starts pushing data. Use urlsr to filter data and then further filter by ck4change
### 51-hvac-v8k-SchedEdit-childof-SensorRelay
ready to save to db
### 50-hvac-v8j-ready2change-broker-express-29
### 49-hvac-v8i-HHmm
### 48-hvac-v8h-Sched-modify
### 47-hvag-v8g-processNewSched
actuall most of the test were done in `services/IOTbroker2.0/test/atest.spec.js` for what will end up in `WeekSched`. Still have to change the database and the broker and maybe express as well
### 46-hvac-v8f-DaySched-WeekSched
ready to set up WeekSched first with editor that can be used for DaySched 
schedsObj created will create buttons for `M`, `T`  etc + `default` and `hold` that wil bring up the appropriate schedule for the editor
### 45-hvac-v8e-refactor-componentDidMount
Took a look at [qstate object](test/app-objects/qstate.json) and fon how it interacts with setState. Refactored `SensorRelay` to use `interface/reset`'s functions to change state

### 44-hvac-v8d-hold-worksnow-fullstack
### 44-hvac-v8c-hold
Boosts and holds. 

There are 2 types of boosts, a 'cmd' boost where you just replace the temps for the currently running schedule event, changing its '/srstate' darr. The other kind of boost crosses schedule event boundaries or lasts for less time than the current schedule event calls for. this is a '/prg' boost and it changes the devicees sensor '/sched' for that day, rewriting the schedule.

Holds operate over more than the current day and require two steps. The first step rewrites the days schedule addng a hold at a certain temperature for the rest of that day. The second step causes an interaction with the sched database so that when the device picks up the next days schedules at midnight, it defers to any holds in place for that devices senrels. 
### 43-hvac-v8b-boost-modifySched
### 42-hvac-v8a-streq-createSchedObj
https://jsperf.com/lo-dash-vs-underscore-vs-json-stringify-isequal/2
TODO SaveSched maybe something to publish something
### 41-hvac-v7h-refactored2-setupMqttStore-hookupMqtt
### 40-hvac-v7g-mqtt$next-pubsub-funcs
TODO Every time a component mounts, if atLoc hasn't already happened, then the component has to create mqttStore(so it can subscribe to it)and createSubscriptions and createStartupPubreqs so qOnMount, qOnFocus or  qOnPageSwitch can connect, end or req the mqtt service. It need reformulating.
### 39-hvac-v7f-redo-refresh-logic
### 38-hvac-v7e-sr-schedUpdateQdata
TODO force update on back and forward into ZonesHOC goahead
<s>TODO xfrmSrstate</s> instead srUpdateQdata and schedUpdateQdata
### 37-hvac-v7d-interface-q-maybe
maybeConnect is called from components that need mqtt feed. It combines the original app store infocus listener with the ready state of mqtt$ to connect or not to mqtt. the mqttStore is activated in AtLoc for the particular loc and its devs and zones.
### 36-hvac-v7c-services-todo-2nd-store
mqttConnect starts up mqtt and subscribes to things it publishes. The trick is to create some kind of render props that modifies state for components that need fresh mqtt data. It will create a store

    const action$ = new Subject();
    const createStore = (initState) =>
      action$
        .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
        .startWith(initState)
        .scan(mqttReducer);

then 

    const mqttStore= createStore(initState)

somehow then

    props
    mqttStore.subscribe((mqtt)=>{
      chunk a piece of mqtt
      return (
          <MyComponent {...props},{...mqtt}/>
        )
    })

or 

    const addMqttStore =(mqttStore, props, mqttPiece, Component)=>{
      mqttStore.subscribe((mqtt)=>{
        somemqtt = mqttPiece(mqtt)
        state = mqtt+props
        const QComponent = Component(state)
      }
      return QComponent
    } 
    return(
        <div className="header item-default">
          {addMqttStore(mqttStore, props, mqttPiece, Component)}
        </div>




### 35-hvac-v7b-services-worksalittle
about to move all the functions inside fromNqtt to inside `Observable.create ((obs)=>`
### 34-hvac-v7a-services-mqtt-actions
### 33-hvac-v7
### patterns
from: https://medium.freecodecamp.org/evolving-patterns-in-react-116140e5fe8f by Alex Moldovan

HOC - withAuthentication -pulls isAuthenticated out of state and then adds a redirect

    function withAuthentication(WrappedComponent) {
      const ModifiedComponent = (props) => {
        if (!props.isAuthenticated) {
          return <Redirect to="/login" />;
        }
        return (<WrappedComponent { ...props } />);
      };
      const mapStateToProps = (state) => ({
        isAuthenticated: state.session.isAuthenticated
      });
      return connect(mapStateToProps)(ModifiedComponent);
    }

HOC - using JSX

    const withProps = ( newProps ) => ( WrappedComponent ) => {
      const ModifiedComponent = ( ownProps ) => ( 
        <WrappedComponent { ...ownProps } { ...newProps } /> 
      );
      return ModifiedComponent;
    };
    const Details = ( { name, title, language } ) => (
      <div>
        <h1>{ title }</h1>
        <p>{ name } works with { language }</p>
      </div>
    );
    const newProps = { name: "Alex" }; // this is added by the hoc
    const ModifiedDetails = withProps( newProps )( Details ); 
    // above is curried for readability
    const App = () => (
      <ModifiedDetails 
        title="I'm here to stay"
        language="JavaScript"
      />
    );

props destructuring - com doesn't need but children do

    const Details = ( { name, language } ) => (
      <div>
        <p>{ name } works with { language }</p>
      </div>
    );
    const Layout = ( { title, ...props } ) => (
      <div>
        <h1>{ title }</h1>
        <Details { ...props } />
      </div>
    );
    const App = () => (
      <Layout 
        title="I'm here to stay"
        language="JavaScript"
        name="Alex"
      />
    );

conditional render

    const condition = true;
    const App = () => (
      <div>
        <h1>This is always visible</h1>
        {condition && (
            <div>
              <h2>Show me</h2>
              <p>Description</p>
            </div>
          )
        }
      </div>
    );

fetch - promise version

    componentDidMount() {
      this.setState({ content: this.props.loading() })
      fetch(this.props.url)
        .then(res => res.json())
        .then(
          res => this.setState({ content: this.props.done(res) }),
          res => this.setState({ content: this.props.error() })
        )
    }

fetch - await version

    componentDidMount() {
        this.setState({ content: this.props.loading() })
        try {
            const res = await fetch(this.props.url);
            this.setState({ content: this.props.done(res.json()) });
        } catch (err) {
            this.setState({ content: this.props.error() });
        }
    }

fetch - App turns over rendering to Fetch. Each Fetch prop is a (render) function. As state changes so does which function is returned in fetch's render function.

    import React from 'react';
    import { render } from 'react-dom';
    class Fetch extends React.Component {
      constructor() {
        super();
        this.state = {
          content: ""
        }
      }
      componentDidMount() {
          this.setState({ content: this.props.loading() })
          try {
              const res = await fetch(this.props.url);
              this.setState({ content: this.props.done(res.json()) });
          } catch (err) {
              this.setState({ content: this.props.error() });
          }
      }
      render() {
        return this.state.content;
      }
    }
    const App = () => (
      <Fetch
        url="https://www.booknomads.com/api/v0/isbn/9789029538237"
        loading={() => (
          <div>Loading ... </div>
        )}
        done={(book) => (
          <div>You asked for: { book.Authors[0].Name } - {book.Title}</div>
        )}
        error={() => (
          <div>Error fetching content</div>
        )}
      />
    );
    render(<App />, document.getElementById('root'));


render props - here ceding control to child

    class ScrollPosition extends React.Component {
      constructor( ) {
        super( );
        this.state = { position: 0 };
        this.updatePosition = this.updatePosition.bind(this);
      }
      componentDidMount( ) {
        window.addEventListener( "scroll", this.updatePosition );
      }
      updatePosition( ) {
        this.setState( { position: window.pageYOffset } )
      }
      render( ) {
        return this.props.children( this.state.position )
      }
    }
    const App = () => (
      <div>
        <ScrollPosition>
          { ( position ) => (
            <div>
              <h1>Hello World</h1>
              <p>You are at { position }</p>
            </div>
          ) }
        </ScrollPosition>
      </div>
    );

Working toward rxasred for the mqtt part. SensorRelay will connect, subscribe and will listen for a piece of the state. Now working on moving from devs&zones to devid,sr,id,name,img
### 32-base.context-renderprops
share props with all the children.
https://libraries.io/npm/react-dom/16.3.0-alpha.1
https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b
https://medium.com/@baphemot/whats-new-in-react-16-3-d2c9b7b6193b
https://dev.to/wxyyxc1992/frontend-weekly-no5-react-context-api--patterns-evolution-web-optimize-with-webpack-page-generation-by-ai-39ac
https://dev.to/sammyisa/explain-the-new-react-contect-api-like-im-five-1aho
https://www.google.com/search?q=using+react+context&client=firefox-b-1-ab&source=lnt&tbs=qdr:m&sa=X&ved=0ahUKEwjhqv7Y6aHZAhUKwFkKHTAYDC4QpwUIIQ&biw=1057&bih=927
https://github.com/jamiebuilds/unstated
https://github.com/reactjs/rfcs/blob/master/text/0002-new-version-of-context.md

see renderprops/README.md
### 31
#### adjusting range input


### 30-hvac-v6p-mqttFor-componentWillUpdate
TODO when moving back from 12ParleyVale/peri we need to reconstitute zdat.
### 29-hvac-v6o-SenRel
If you click on a zone in zones it adds an `sr` parameter to locs params. After Loc succesfully loads zone and device data, it checks to see if there is an `sr`. If so it only sends Zones that one zone. If Zones sees only one zone it diplays SenRel. Meanwhile data keeps flowing from mqtt.
param

### 28-hvac-v6n-zone
zone as li component
### 27-hvac-v6m-mqttFor-infocus-mounted-connected
infocus set from window.onfocus.onblur. mqttFor is initialized !connected and !mounted, mounted is toggled by the mount lifestyles and connected is toggled in onConnect() and onConnectionLost 
// console.log(JSON.stringify(zones, null, '\t'))
infocus
### 26-hvac-v6l-mqttFor-zones-fix
Instead of trying to tag on to zone fields (from the database), now zdat just copies the id of each zone and becomes a template for the mqtt message data.
### 25-hvac-v6k-mqttFor-zones
https://github.com/thejameskyle/unstated
got temps on screen, on returning doesnt update values
TODO fix Loc.js:53  `if(infocus){` to something like `if(infocus && inviewport){`
### 24-base-vb-va+reg
Added back `Registered` as a place for soauth to return to and store the email and token in ls. Remember token encodes the appid.
### 23-base-va-rxrt
Back to the basics in search or onfocus onvisible controll of mqtt connection. This base has no mqtt just rxred state store [rxasred review](# review-of-rxasred) and navigo routing. 

`About` uses `Observable.ajax(url)` to change the store by the `loadGithubFollowers` action which progressively changes the test state with GITHUB_FOLLOWERS_LOADING then GITHUB_FOLLOWERS_LOADED



### 22-hvac-v6j-eslint
### 22-hvac-v6i-loc-rx-focus
infocus gets set by setFocus action from window.onfocus,onblur. Every change in incoming state(props) causes a rerender. All the logic is in render. componenDid Mount doesn't react to focus so that would leave mqtt running. maybeLoad checks the props to see whats up in `{status, data, message}` which gets set by the fetchFor wrapper. If successful, `data` contains the array of devices that this app needs at this location. 
### 21-hvac-v6h-loc-paho
makeMqtt now takes the callbacks as parameters.
### 20-aajswp-shroom-paho3-util-test
Now utilities are a bit cleaned up. First write utilities and have them console.log to the browser running a test at the bottom of the page. Then put it in test once it works
### 19-aajswp-shroom-paho2-as-factory
Rewrote with paho.js which takes some cfg stuff and then when called from app.js as as `const mq = makeMqtt(cfg.devices)` it connects. app.js expors a callback function that gets called on every message 

    function onMessageArrived(message){
      aMessageCB(message)
    }  
## 18-esslint-aajswp-shroom
Errors suck so started using eslint. Spent a day on an an undefined variable causing `Connection Lost AMQJS0005E Internal error. Error Message: message is not defined, Stack trace: ...` and thinking somehow mqtt was broken when it wasn't.
https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
eslintrc.json is in /spa. Rewuired elslint and eslint-loader for webpack. Last loader executes first so 

    module: {
      rules: [
        { test: /\.js$/, 
          exclude: /node_modules/,
          use: [
            "babel-loader",
            "eslint-loader"
          ]
        },
        { test: /\.html$/, use:[{loader: "html-loader" }]}
      ]
    },


### 17-aajswp-shroom
What does a simple poj program look like if using import instead of `<script src="./sdf"` ? 
#### browser vs webpack vis a vis paho
- The browser is not fussy on declaration of variable, but webpack most certainly is. DO check that all variables are declared when using paho
- errores like `Connection Lost AMQJS0005E Internal error. Error Message: message is not defined, Stack trace: ...` are not about Paho, they are likely about crappy javascript code.
### 16-hvac-v6g-loc-as-class
frog
#### changing a functional component to a class
In prepartion for adding mqtt as state in the loc component, first change it from a function to a component. Compare loc in 6f and 6g. You will see that

    function Loc(props){
      return(h1)
    }

becomes

    class Loc extends React.Componnent{
      constructor(props) {
        super(props);
      }
      render(){
        return(h1)
      }      
    }

and all the rest of the functional component goes in the render function

      render(){
        const { name } = this.props.test;
        const {params} =this.props.responsive.page
        const {status, data, message} = this.props
        const listItems= data.map((item, i)=>{
          let hash = '#at/'+item
          return(
            <li key={i}><a href={hash} data-navigo>{item}</a></li>
          )
        })
        return(h1)

### 15-hvac-v6e-fetchFor-w-errorhandling
Using HOC's as a way to change state asynchronously in `LocList`. `fetchFor`...

note: prior versions using fetchFor are now broken as they call `api/dedata/localist/:appid/:usreid` instead of the preferred `api/dedata/localist/`. this is because the token already has the appid and the email encoded within it.

* takes `fetchFor(Component, fconfig)` where fconfig has a base `url` and `options`
* when it mounts, grabs a fresh copy of the token and email from ls and combines it with url and options.
* adds an object with `{status: 'waiting, error, success', data: data, message:, message}` to the state, which is linked to the props of the `Component`.
* `error` messages are `server failure` or `not-authorized`.
* `success` messages are `no-records`, `just-1` or `multi`
* returns a class component.
* should be reusable as a wrapper on other components awaiting server data

### 14-qd-rt-in-app-w-hoc

* Since HOC's need to return an element in order to get turned into returned JSX, there needs to be an `mapClass2Element` HOC around HOC's like `HocSetTimeout` that update a component on an async change. It is like this...

      function mapClass2Element(anElement){
        //returns a function called later with store as its arg and anElement from here
        return (state)=>{
          const props= state
          return React.createElement(anElement, props)
        }
      }
      HOC = mapClass2Element(HocSetTimeout(HOC))
* /src/util/isa.js has a bunch of functions to test for `isClassComponent, isFunction, isFunctionComponent, isReactComponent, isElement, isDOMTypeElement, isCompositeTypeElement`
*   "description": "quick and dirty frame with navigo in app.js and a HOC in dog with async timout then map to page"
* class constructor and componentDidMount only fire on the first render of App
* Navigo picks up the hash on refresh

https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
### 13-qd-HOC

qd = quick and dirty, a test of functional HOC
### 12-hvac-v5-loclist2hoc
https://reactjs.org/docs/higher-order-components.html

https://medium.com/@svensauleau/render-async-stateless-functional-components-in-react-11a888ceb828

https://github.com/esphen/fetch-hoc/blob/master/src/index.js


navigate only works (like in Home) if the element is rendered and you use a button
rationalize cfg and get it constructed in app.js----. use location. instead
### 11-hvac-v5
v5a is working copy
### 10-hvac-v4-paring-down
[initial navigation](#initial-navigation)
### 09-hvac-b2-code-splitting
delay loading history from utilities/loc until componentDidMout  of App

https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element



WTF rr4 makes you jump trough hoops to nowhere to programmatically navigate to a new route.

whatif any principle or subroutes are controlled by an observable?

ie history is  

### 08-spa-cra-rr4
Using create-react-app and react-router-dom 4.
https://medium.com/@mckenna.tim/using-npm-on-an-old-computer-2fd3a79d16cf
#### Using npm on an old computer

 `npm` installs created when you use `cli's` like `create-react-app` are on the order of hundreds of megabytes. On my 7 year old Windows 7 HP Pavilion (Git bash) it can take 5 minutes install `hello world` and just as long to delete. That's the only thing that bothers me for software development. Tests run fine; transpiling is reasonable. Otherwise, I see little other reason to upgrade to another machine. But I have found a work around.

  My style of learning is to build many quick and dirty apps to try out things. Running `create-react-app` for each one ain't happening. `package.json` will look for `node_modules` all the way up the directory tree so creating a parent directory to hold shared `node_modules` works great. Here is a directory tree...

     cra
      blank
      biggerapp
      hello-world
      hello-react-router
      killer-app
        v1
        v2
        v17
      node_modules

First run something like `create-reat-app blank` from `cra` then move the `node_modules` out of `cra/blank` and into `cra`. `create-react-app` relies on `react-scripts` for start, build test and eject but now it won't find them. Open  `package.json` for `blank` and change

    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    }
to

    "scripts": {
      "start": "set PORT=3003 && node ../node_modules/react-scripts/bin/react-scripts.js start",
      "build": "node ../node_modules/react-scripts/bin/react-scripts.js build",
      "test": "node ../node_modules/react-scripts/bin/react-scripts test --env=jsdom",
      "eject": "node ../node_modules/react-scripts/bin/react-scripts eject"
    }

On a mac I would guess it would be something like

    "start": "PORT=3003 ../node_modules/react-scripts/bin/react-scripts.js start"

Then each time you want to spin up another app just create a duplicate the `blank` directory, change the port in `package.json` and (npm) start it right up. Some variation of this technique works for any big stack, if something can't be found automatically just add the `../../node_modules/...path` to the binary it can't find. Later when you want to run off a more updated stack, create another master directory and a
basic blank code skeleton, move back the `node_modules` and duplicate/modify/version quickly whenever you want.   

## deploying a react router 4 app to a subdirectory

`creat-react-app` is a good base for adding `react-router-dom 4`. And having your routes work without `#` just looks cooler. `BrowserRouter` works fine on the devserver. Here's what you have to do to get it to deploy and still work.

Say you want to deploy the app in the `rr4` subdirectory of the host `tryit.sitebuilt.net` . ie you type in `tryit.sitebuilt.net/rr4` to run it.

in `package.json` add this line... `"homepage": "http://tryit.sitebuilt.net/rr4"`. In the `src/index.js` file of the app add the prop `path='rr4'` to `ReactDOM.render(<App path='rr4'/>, document.getElementById('root'));` When in the devserver and it says `You can now view xxx in the browser.` add `rr4` to the url in the browser. On the server, copy everything from the build directory into `/home/tryit/public_html/rr4`
### 07-spa-hvac-v3
Things load because of import. So the entry point is app.js and the first thing loaded is showRWD. Routing is implemented with showRWD.js on its own and routing like admind.

### initial-navigation

What should wrap `home/locid`, `loclist` and `login` to authenticate user?

    If home
      if curloc, email and token in ls
        navto homw/:locid  
      else if no loc but email and token
        navto loclist
      else navto login    


    If home/:locid
      if devices email  and token in ls
        `connect to devices` with email and token
        if connect
          start getting data
        else navto login  
      else if no devices but curloc email and token
        `get devices for this user and app and loc store in ls`
        `connect to devices`

    if in LocList
      get locs for this user
      if only one
        navto home/:locid
      else make list  
      on click `get devices for this user and app and loc and store in ls`
        navto home/:locid

    if registered
      on callback
        store email and token in ls
        if ! locids `get locids for this user and appId`
        if locids==1
          `get devices for this user and app and loc and store in ls`
          navto home/:locid[0]
        else navto loclist  

What should ls look like?

currently...

    appid: {
      email:
      token
    }

should be...

    appid: {
      email:
      token:
      currentLoc: {
        locid:
        devices: [
          CYURD006,
          CYURD007
        ]
      }
      locs: []
    }

what queries need to get done?

select locids for user and app
select devices for locid and user and app


### 06-spa-hvac-v2-routing
basic routing without responsive
### 05-hvac-v1-homeOrlogin
A blank project with a few routes.

    <home-or-login app={appinfo} home={home} login={login}></home-or-login>

    appinfo={appId:, authUrl:, cbPath:, api: }

    spa
      admind
      rxasred
      hvac
        dist
        src
          components
            Home.js
            About.js
            Nav.js
      login
        HomeOrLogin.js

step1: create a dummy hvac with         

Updated navigo to 6.0.0 so the proper url shows up.
#### review of admind responsive routing

switchPage is an action of type 'PAGE_SWITCHED' that gets reduced and changes the state.responsive.page object. Here's what happens when you navigate to /registered.

      const routing = ()=>{
      	const cfg ={root: null, useHash: true}
      	router = new Navigo(cfg.root, cfg.useHash);
      	router
      	  .on({
            ...  
            'registered': (params, query)=>{
              switchPage({name: 'Registered', params: {query: query}});
            },...

rxasred/createStore creates a subject stream and app.js subscribes to it. When this store changes react rerenders the App component with the new state.     

    createStore(initState)
      .do(log)
      .subscribe((state) =>{
      	copyStore(state)
        return ReactDOM.render(<App {...state} />, container)
      });   

So whenever the state change, App.js's render function is called and its showPage() method is run which returns the utilities/wfuncs/responsivePage(this.props) function.

    showPage=()=>{
      return responsivePage(this.props)
    }
    render(){
      return(
        <div className="container">
          <div className="header item-default">
            {this.loadNav()}
          </div>
          {this.showPage().map((el,i)=>{
            return <div className="content item-default" key={i}>{el}</div>
          })}
        </div>
        )    

The state updates the responsive/browser string whenever the page is resized and from the browser type a lookup is done on how many panes should be displayed. That info combined with the page name filters multi to the appropriate  multi.mul array of page names to be displayed.

    const multi =[{pri:'About', mul:[
				['About', 'Products'],
				['Products', 'About', 'Home']]
			 }, ...

If that multiList isn't found for a state.responsive.page.name then the function/class of that page.name is put in an array.

compoi is the components components/index.js exports. along with `panes` and `multi` (used to set up reponsive panes). index.js exports and compoi also gets all the components. `compoi[pagename](state)` is a component.

If there is a multiList for that page and browsersize, elList maps through the component names and creates a new array of real components.

    if (multiList.length==0){ // if the multilist is empty
      const singleElement = compoi[pageName](state)
      elArr.push(singleElement)
    }else{//use the array matching the panesPerType size and add all its names to the element arrray
      const elList = multiList[0].map((pgStr, i)=>{
        const pg = compoi[pgStr](state)
        return pg
      })
      elArr = elList
    }

The render function of App.js maps through the component list creating a div for each one.

    {this.showPage().map((el,i)=>{
      return <div className="content item-default" key={i}>{el}</div>
    })}
### 03-egg
added directory with notes and references from egghead.io classes
### 02-rxrena-rsasredux
added ui/k3

#### on embedding a timer_ctrl

A heating system app would have one or more locations in a house. The main page would have basic data for the house (location, temp, setpt, ison, lastchange).

_The house could be comprised of 1 or more esp8266s, each with one or more sensors/relays (senrels)._

Clicking on a location, switched you to a page that allows you to boost or hold a location. Details might include the current day's schedule.

Clicking on todays schedule takes you to a __timer_ctrl__.

Clicking on schedule takes you to a table that lists the overall schedule: by day, everyday, weekend, weekday, for_date. From there, clicking on anything but for_date takes you to __timer_ctrl__. Schedule also has a copy_to button to copy schedule to other locations.

_to mock it <sb-timr-ctrl sched={sched} schedChanged={handleSchedChange}> gets placed in a page that has state and passes a schedule array as props. __timer_ctrl__ messes with that schedule until it gets it right and then schedChanged gets called with an sched object returned  _

__timr_ctrl__ takes an object like

    raw: [
        [0,0,59],
        [9,10,74],
        [9,40,62],
        [17,0,68],
        [22,30,58]
    ]

and transforms it to

    decans: {
        g1: [0.0, 9.13, 59],
        g2: [9.13, 9.66, 74],
        g3: [9.66, 17.00, 62],
        g4: [17.00, 22.33, 67],
        g5: [22.33, 0.0, 58]
    }

and then draws that. Modifying the cornerGrabs changes the associated object  

### 01-rxrena-admind-aapoj
moved up to react 16.1.1, rxjs 5.5, navigo5.3.3, paho.mqtt.js 2.0.5
got rid of createClass in Devinf.js so admind would run. brought over just the basic active stuff from spas

## review of rxasred
Ok so at the heart of things:

    action$.scan(reducer).subscribe(renderer)

    action$ is an observable stream.  

an actionCreator takes a payload and returns an object `{type:'SOMEACTION',payload:payload}`. Defining an action means giving it a name and a type. ActionCreator then throws this action on the action$ stream which takes the action and state and puts it through the reducer to create a new state. That state has been subscribed to so that the render function of react is called every time state changes

        const action$ = new Subject();

        const createStore = (initState) =>
          action$
            .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
            .startWith(initState)
            .scan(rootReducer);

        const actionCreator = (func) => (...args) => {
          const action = func.call(null, ...args);
          action$.next(action);
          if (isObservable(action.payload))
            action$.next(action.payload);
          return action;
        };

    const changeName = actionCreator((payload) => ({
      type: 'NAME_CHANGED',
      payload
    }));

### apply, call and bind review
http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
Bind () Allows us to Borrow Methods
the first argument of bind sets 'this'

    $("button").click (user.clickHandler.bind (user));

You need .bind(user) because otherwise it expects button to have a user.clickHandler method. .bind(user) says the function is actually here(in user)

Bind Allows Us to Curry a Function 
The remaining arguments of bind can be stepped over and selectively reset. Below, the first argument(after this) is "" is skipped over and the second argument is preset to 16.



    var greetAnAdultMale = greet.bind (null, "", 16);




We can create a function that presets one or more of the parameters of another function.


### common issues
- DO use .babelrc for all babel presets and stuff. Now mocha can access it
- DO use a `test/mocha.opts` with at least `--compilers js:../node_modules/babel-register` and do give the path to where the node_modules really are
- DO try new stuff in local node_moodules then move them here and fix what needs fixing
- DON'T run npm global stuff. To get to the binary for cli do something like `node ../node_modules/webpack/bin/webpack` to run the latest version
- DON'T assume you have loaded enough babel presets to actually use all es6 features. DO on error first look for a babel preset before you assume some other problem
#### browser vs webpack vis a vis paho
- The browser is not fussy on declaration of variable, but webpack most certainly is. DO check that all variables are declared when using paho
- errores like `Connection Lost AMQJS0005E Internal error. Error Message: message is not defined, Stack trace: ...` are not about Paho, they are likely about crappy javascript code.
