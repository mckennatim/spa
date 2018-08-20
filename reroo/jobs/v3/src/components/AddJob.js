import React from 'react';
import {mapClass2Element} from '../hoc/mapClass2Element'


class AddJob extends React.Component {
  state = {  }
  render() { 
    return (
      <div>
        <h4>ho AddJob</h4>
      </div>
      );
  }
}
AddJob = mapClass2Element(AddJob)

export {AddJob};