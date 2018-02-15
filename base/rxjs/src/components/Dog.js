import React from 'react'// eslint-disable-line no-unused-vars
import {ThemeToggler, ThemeContext} from '../providers/ThemeToggler'// eslint-disable-line no-unused-vars


function Dog(props){
  const { name } = props;
  return(
    <ThemeContext.Consumer>
      {theme => {
        return(
          <div style={{background: theme === 'light' ? '#6da9d2' : '#f9ff9a'}} >
            <h4>in big doDog {theme} {name} </h4>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  );
}

export {Dog}
