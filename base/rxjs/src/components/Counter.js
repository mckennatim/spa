import React from 'react' // eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'


class Counter extends React.Component {
  state = { count: 0 };
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

Counter = mapClass2Element(Counter)

export{Counter}