// @flow
import React from 'react';// eslint-disable-line no-unused-vars
import { render } from 'react-dom';// eslint-disable-line no-unused-vars
import { Provider, Subscribe, Container } from 'unstated';// eslint-disable-line no-unused-vars

type AppState = {
  amount: number
};

class AppContainer extends Container<AppState> {
  state = {
    amount: 1
  };

  setAmount(amount: number) {
    this.setState({ amount });
  }
}

type CounterState = {
  count: number
};

class CounterContainer extends Container<CounterState> {
  state = {
    count: 0
  };

  increment(amount: number) {
    this.setState({ count: this.state.count + amount });
  }

  decrement(amount: number) {
    this.setState({ count: this.state.count - amount });
  }
}

function Counter() {// eslint-disable-line no-unused-vars
  return (
    <Subscribe to={[AppContainer, CounterContainer]}>
      {(app, counter) => (
        <div>
          <span>Count: {counter.state.count}</span>
          <button onClick={() => counter.decrement(app.state.amount)}>-</button>
          <button onClick={() => counter.increment(app.state.amount)}>+</button>
        </div>
      )}
    </Subscribe>
  );
}

function Unstated() {
  return (
    <Subscribe to={[AppContainer]}>
      {app => (
        <div>
          <Counter />
          <label>Amount: </label>
          <input
            type="number"
            value={app.state.amount}
            onChange={event => {
              app.setAmount(parseInt(event.currentTarget.value, 10));
            }}
          />
        </div>
      )}
    </Subscribe>
  );
}

export{Unstated, CounterContainer, AppContainer}