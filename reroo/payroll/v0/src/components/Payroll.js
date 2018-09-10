import React from 'react';
import {mapClass2Element} from '../hoc/mapClass2Element'

class Payroll extends React.Component {
  constructor(props){
    super(props)
  }
  state = {  }

  render() {
    console.log('this.props: ', this.props) 
    return ( 
      <div>
        <div style={{height:'60px',background:'yellow'}}>
          <div style={{float:'right'}}>payroll</div>
        </div>
        <div>
          <p>
        Leslie Moonves, the longtime chief executive of the CBS Corporation, stepped down on Sunday night from the company he led for 15 years. His fall from Hollywood’s highest echelon was all but sealed after the publication earlier in the day of new sexual harassment allegations against him.
The CBS board announced his departure, effective immediately. As part of the agreement, the network said it would donate $20 million to one or more organizations that support equality for women in the workplace. The donation will be deducted from a potential severance benefit to Mr. Moonves, although he could still walk away with more than $120 million, according to two people familiar with the settlement agreement.
Mr. Moonves, however, will not receive any severance payment, until the completion of an independent investigation into the allegations, the board said. He could also receive nothing, based on the investigation’s results.
Joseph Ianniello, the chief operating officer of CBS and one of Mr. Moonves’s closest advisers, was named the interim chief executive.          
          </p>
        </div> 
      </div>
    );
  }
}

Payroll=mapClass2Element(Payroll)
 
export {Payroll} ;