import React from 'react'
import {mapClass2Element} from '../hoc/mapClass2Element'

const ThemeContext = React.createContext('light')
class ThemeProvider extends React.Component {// eslint-disable-line no-unused-vars
  state = {theme: 'light'}
  toggleTheme = () => {
    this.setState(({theme}) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }))
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <button onClick={this.toggleTheme}>toggle theme</button>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}
// only doing this to shield end-users from the
// implementation detail of "context"
const ThemeConsumer = ThemeContext.Consumer// eslint-disable-line no-unused-vars

const styles = {
  dark: {
    backgroundColor: 'black',
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: 'black',
  },
}

class Btheme extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <ThemeConsumer>
          {theme => <div style={styles[theme]}>{theme}</div>}
        </ThemeConsumer>
      </ThemeProvider>
    )
  }
}


Btheme=mapClass2Element(Btheme)
export{Btheme}
