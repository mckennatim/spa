import React from 'react';

class DevInf extends React.Component{

  componentDidMount=() =>{
    // console.log('Devinf mounted')
    // this.client = mqttCon(this.currentDev.id, this.props)
  }
  componentWillUnmount=()=>{
    // console.log('Devinf unmountd')
    // this.client.publish('presence', 'Help, wants to close! ');
    // this.client.end();    
  }
  makeTimrMap=()=>{
    const timrRaw = this.props.timr.tIMElEFT
    const ISrELAYoN = this.props.timr.ISrELAYoN
    const timr = timrRaw.map((t,i)=>{
      const relon = (Math.pow(2,i) & ISrELAYoN)>0 ? "on" : "off"
      return {id:i, sec:t, ison:relon}
    }).filter((t,i)=>{
      return (Math.pow(2,i) & this.HAStIMR)>0
    })
    return timr
  }
  generateHeaders=()=> {
    const tags = this.props.currentDev.specs.notTimerTags
    return tags.map(function(h,i) {
        return <th key={i}> {h} </th>
    });
  }    
  generateRows=()=>{
    const dev = this.props.currentDev.id
    const rawState = this.props.rawState
    const notTimer = 31 - this.HAStIMR
    const srstate = rawState.filter((sens)=>{
      return (Math.pow(2,sens.id) & notTimer)>0
      }).map((sens)=>{
        //console.log(sens.id)
        const art = `#/dev/${this.currentDev.id}/${sens.id}`
        const cells = sens.darr.map((d,i)=>{
          return <td key={i}> {d} </td>;
        })
        return <tr key={sens.id}><td><a href={art}>temp{sens.id}</a></td>{cells}</tr>
      })
    return srstate
  }
  render(){

    this.currentDev = this.props.currentDev
    this.HAStIMR = this.props.flags.HAStIMR
    const timr = this.makeTimrMap()
    const {name}= this.props 
    const headerComponents = this.generateHeaders()  
    const rowComponents = this.generateRows() 
      
    return(
      <div style={styles.outer}>
        <h4>in doDevinfo {name}</h4>
        {this.currentDev.name} <br/>
        {this.currentDev.id} <br/>
        {this.currentDev.desc}<br/>
        <ul style={styles.ul}>
        {timr.map((tmr, idx)=>{
          const art = `#/dev/${this.currentDev.id}/${tmr.id}`
          return(
            <li key={idx} style={styles.inner}>
            <a href={art}>relay{tmr.id}:</a> 
            <span style={styles.span}> {tmr.ison}</span>
            <span style={styles.span}> {tmr.sec}</span>
            </li>
          )}
        )}
        </ul>
        <div style={styles.tablediv}>
          <table style={styles.table}>
            <thead></thead>
            <tbody>
              <tr><th>sensor</th>{headerComponents}</tr>
              {rowComponents}
            </tbody>                      
          </table>
        </div>
      </div>
    )    
  }
}
function mapStoreToProps(anElement){
  //returns a function called later with store as its arg and anElement from here
  return (store)=>{  
    const props= {
      currentDev: store.mqtt.currentDev,
      timr: store.mqtt.timr,
      flags: store.mqtt.flags,
      rawState: store.mqtt.srstate,
      name: store.test.name
    }
    return React.createElement(anElement, props)
  }
}

DevInf = mapStoreToProps(DevInf)
export {DevInf} 


const styles= {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    background:'#C4A265',
    height: 400,
    textAlign: 'center'    
  },
  inner: {
    margin: '0 auto',
    background: '#FFF28E',
    color: 'green',
    textAlign: 'left',
    fontSize: '100%',
    padding: 3,
    border: '1px solid #dddddd'
  },
  tablediv: {
    margin: '0 auto',
    background: '#8fd3ba',
    color: 'blue',
    textAlign: 'left',
    fontSize: '100%'
  },
  span: {
    float: 'right',
    paddingLeft: 15
  },
  ul: {
    margin: '0 auto',
    listStyleType: 'none',
    width: 160,
    padding: 35
  },
  table:{
    borderCollapse: 'collapse'
  }
}