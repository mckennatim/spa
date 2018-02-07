import React from 'react' // eslint-disable-line no-unused-vars


function Zone(props){
  const { name, zdati, zdsc } = props;
  return(
    <li key={zdati.id}>
      {zdsc.name} {zdati.temp}
    </li>
    )
}

export {Zone}
