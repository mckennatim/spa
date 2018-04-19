import React from 'react' // eslint-disable-line no-unused-vars


function Zone(props){
  const {zdsc, loc } = props;
  console.log(zdsc)
  let hash = '#at/'+loc+'/'+zdsc.id
  return(
    <li key={zdsc.id}>
      <a href={hash} data-navigo>
        {zdsc.name} temp:{zdsc.sr.temp} relay: {zdsc.sr.relay} setpt: {zdsc.sr.setpt}
      </a>
    </li>
    )
}

export {Zone}
