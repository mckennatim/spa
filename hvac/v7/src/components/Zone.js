import React from 'react' // eslint-disable-line no-unused-vars


function Zone(props){
  const {zdsc, loc } = props;
  let hash = '#at/'+loc+'/'+zdsc.id
  return(
    <li key={zdsc.id}>
      <a href={hash} data-navigo>
        {zdsc.name} 
      </a>
    </li>
    )
}

export {Zone}
