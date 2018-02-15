import React from 'react' // eslint-disable-line no-unused-vars
import {ThemeToggler, ThemeContext} from '../providers/ThemeToggler'// eslint-disable-line 
import {Dog} from './Dog'// eslint-disable-line no-unused-vars

import {pStyle} from '../styles'
const style = {
 ...pStyle, outer: {...pStyle.outer, background: '#C4A265'}
}
pStyle.outer.background='#C4A265'

class Title extends React.Component {// eslint-disable-line no-unused-vars
  constructor (props){
    super(props); 
  } 
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          return(
            <h4 style={{color: theme === 'light' ? 'blue' : 'green'}}>
              {this.props.children}
            </h4>
          )
        }}
      </ThemeContext.Consumer>
    );
  }
}

function Atheme(props){
  const { name } = props;
  return(
    <div style={style.outer} >
    <h4>in big doTheme {name} </h4>
    <ThemeToggler>
      <Title>
        This Atheme toggles 
      </Title>
      <Dog></Dog>
    </ThemeToggler>
    </div>
    )
}

export {Atheme}