import React from 'react'
import {mapClass2Element} from '../hoc/mapClass2Element'


class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="../src/img/cat.png" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {// eslint-disable-line no-unused-vars
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.dogshit(this.state)}
      </div>
    );
  }
}

class MouseTrackC extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse dogshit={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

function withMouse(Component) {// eslint-disable-line no-unused-vars
  return class extends React.Component {
    render() {
      return (
        <Mouse dogshit={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}

Cat=mapClass2Element(withMouse(Cat))

MouseTrackC= mapClass2Element(MouseTrackC)
export {MouseTrackC, Cat}